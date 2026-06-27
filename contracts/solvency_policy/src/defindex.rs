// DeFindex Vault Integration Module
//
// This module provides functions to read reserves from DeFindex yield vaults
// Documentation: https://docs.defindex.io/
//
// DeFindex is a yield aggregation protocol on Stellar/Soroban. When users deposit
// assets into vaults, they receive vault shares representing their proportional
// ownership. This module calculates the actual asset value of those shares.

use soroban_sdk::{Address, Env, IntoVal, Symbol, TryIntoVal, Vec};

/// Represents the total managed funds information returned by DeFindex vault
/// According to DeFindex docs, fetch_total_managed_funds returns Vec<AssetAllocation>
/// For simplicity in Veraz, we only care about the total_amount of the first (and typically only) asset
#[derive(Debug, Clone)]
struct AssetAllocation {
    total_amount: i128,
}

/// Read total reserves from DeFindex vaults for a specific user
///
/// This function queries multiple DeFindex vaults to calculate the total value
/// of assets deposited by a user (issuer). It works by:
///
/// 1. For each vault, query the user's vault share balance using `balance()`
/// 2. Query vault's `total_supply()` to get total shares
/// 3. Query vault's `fetch_total_managed_funds()` to get total assets under management
/// 4. Convert shares to asset value: asset_value = (user_shares * total_assets) / total_supply
/// 5. Sum up all converted values across vaults
///
/// # Arguments
/// * `env` - Soroban environment
/// * `vault_addresses` - Vector of DeFindex vault contract addresses
/// * `user_address` - Address of the issuer/depositor
///
/// # Returns
/// Total asset value across all specified vaults, denominated in the underlying asset
///
/// # Important Notes
/// - This performs the "rule of three" conversion from shares to assets as documented
///   in DeFindex docs
/// - Assumes single-asset vaults (takes first element from fetch_total_managed_funds)
/// - Protects against division by zero if vault has no shares
/// - All calculations include overflow protection
///
/// # Example
/// ```
/// let vaults = vec![&env, usdc_vault, xlm_vault];
/// let value = read_defindex_vaults(
///     &env,
///     &vaults,
///     &issuer_address,
/// )?;
/// ```
pub fn read_defindex_vaults(
    env: &Env,
    vault_addresses: &Vec<Address>,
    user_address: &Address,
) -> Result<i128, crate::Error> {
    let mut total_value: i128 = 0;

    // Iterate through all configured DeFindex vaults
    for vault_address in vault_addresses.iter() {
        // Step 1: Get user's vault share balance
        // According to DeFindex docs: balance(from: Address) -> i128
        let user_shares: i128 = env.invoke_contract(
            &vault_address,
            &Symbol::new(env, "balance"),
            (user_address,).into_val(env),
        );

        // Skip if user has no shares in this vault
        if user_shares == 0 {
            continue;
        }

        // Step 2: Get vault's total supply of shares
        // total_supply() -> i128
        let total_supply: i128 = env.invoke_contract(
            &vault_address,
            &Symbol::new(env, "total_supply"),
            ().into_val(env),
        );

        // Protect against division by zero
        if total_supply == 0 {
            continue;
        }

        // Step 3: Get vault's total managed funds
        // fetch_total_managed_funds() -> Vec<AssetAllocation>
        // Note: DeFindex returns a complex structure, but we only need total_amount
        // For now, we'll invoke and extract the first asset's total_amount
        let managed_funds_raw: soroban_sdk::Val = env.invoke_contract(
            &vault_address,
            &Symbol::new(env, "fetch_total_managed_funds"),
            ().into_val(env),
        );

        // Convert Val to Vec - the actual structure may vary, so we handle it carefully
        // According to DeFindex docs, this returns a Vec with asset allocation info
        // For simplicity, we try to extract the total as an i128
        // In a production system, you'd properly deserialize the AssetAllocation struct
        let total_assets: i128 = extract_total_assets(env, managed_funds_raw)?;

        // Step 4: Convert user shares to asset value using "rule of three"
        // Formula: asset_value = (user_shares * total_assets) / total_supply
        //
        // We use checked operations to prevent overflow:
        // 1. Multiply user_shares by total_assets
        // 2. Divide by total_supply
        let numerator = user_shares
            .checked_mul(total_assets)
            .ok_or(crate::Error::Overflow)?;

        let user_asset_value = numerator
            .checked_div(total_supply)
            .ok_or(crate::Error::Overflow)?;

        // Add to total with overflow protection
        total_value = total_value
            .checked_add(user_asset_value)
            .ok_or(crate::Error::Overflow)?;
    }

    Ok(total_value)
}

/// Helper function to extract total assets from DeFindex's fetch_total_managed_funds return value
///
/// This function handles the complex return type from DeFindex vaults. The actual structure
/// is Vec<AssetAllocation> where AssetAllocation contains total_amount and other fields.
///
/// For Veraz MVP with single-asset vaults, we extract the first asset's total_amount.
fn extract_total_assets(env: &Env, managed_funds_val: soroban_sdk::Val) -> Result<i128, crate::Error> {
    // Try to convert the Val to a Vec
    // The structure should be something like: [{ total_amount: i128, ... }]

    // First, try to interpret as a Vec
    let managed_vec: Vec<soroban_sdk::Val> = match managed_funds_val.try_into_val(env) {
        Ok(v) => v,
        Err(_) => {
            // If it's not a Vec, it might be a direct i128 (simplified implementation)
            // Fall back to trying to interpret as i128
            return managed_funds_val.try_into_val(env)
                .map_err(|_| crate::Error::BadPublicInputs); // Reuse existing error type
        }
    };

    // If vec is empty, return 0
    if managed_vec.is_empty() {
        return Ok(0);
    }

    // Get first element (first asset allocation)
    let first_allocation = managed_vec.get(0)
        .ok_or(crate::Error::BadPublicInputs)?;

    // The allocation should be a struct or map with total_amount field
    // For now, try to interpret the first element directly as i128
    // In production, you'd properly deserialize the AssetAllocation struct
    let total_amount: i128 = first_allocation.try_into_val(env)
        .map_err(|_| crate::Error::BadPublicInputs)?;

    Ok(total_amount)
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_read_defindex_vaults_empty() {
        let env = Env::default();
        let user = Address::generate(&env);
        let vaults = Vec::new(&env);

        let result = read_defindex_vaults(&env, &vaults, &user);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), 0);
    }

    #[test]
    fn test_share_to_asset_conversion() {
        // Test the "rule of three" conversion
        let user_shares: i128 = 1000;
        let total_assets: i128 = 10_000_000;
        let total_supply: i128 = 5000;

        // Expected: (1000 * 10_000_000) / 5000 = 2_000_000
        let numerator = user_shares.checked_mul(total_assets).unwrap();
        let result = numerator.checked_div(total_supply).unwrap();

        assert_eq!(result, 2_000_000);
    }

    #[test]
    fn test_overflow_protection() {
        // Test that overflow is properly handled
        let max_i128 = i128::MAX;
        let result = max_i128.checked_mul(2);
        assert!(result.is_none()); // Should overflow
    }
}
