// Aquarius AMM Integration Module
//
// This module provides functions to read reserves from Aquarius liquidity pools
// Documentation: https://docs.aqua.network/
//
// Aquarius is a decentralized AMM on Stellar/Soroban. When liquidity providers
// deposit assets into pools, they receive pool share tokens representing their
// ownership percentage. This module calculates the value of those shares.

use soroban_sdk::{Address, Env, IntoVal, Symbol, Vec};

/// Read total reserves from Aquarius pools for a specific user
///
/// This function queries multiple Aquarius AMM pools to calculate the total
/// value of liquidity provided by a user (issuer). It works by:
///
/// 1. For each pool, query the user's pool share token balance
/// 2. Pool shares represent proportional ownership of pool reserves
/// 3. Sum up all share balances across pools
///
/// # Arguments
/// * `env` - Soroban environment
/// * `pool_addresses` - Vector of Aquarius pool contract addresses
/// * `user_address` - Address of the issuer/liquidity provider
///
/// # Returns
/// Total pool share balance across all specified pools
///
/// # Important Notes
/// - This returns RAW pool share token balances, NOT converted to underlying asset value
/// - To get actual reserve value in USDC/XLM, additional calculations would be needed:
///   * Query pool's total reserves (get_info)
///   * Query pool's total shares
///   * Calculate: user_reserve = (user_shares / total_shares) * pool_reserves
/// - For Veraz MVP, we accept pool shares as-is since they represent locked liquidity
///
/// # Example
/// ```
/// let pools = vec![&env, pool_addr_1, pool_addr_2];
/// let shares = read_aquarius_reserves(
///     &env,
///     &pools,
///     &issuer_address,
/// )?;
/// ```
pub fn read_aquarius_reserves(
    env: &Env,
    pool_addresses: &Vec<Address>,
    user_address: &Address,
) -> Result<i128, crate::Error> {
    let mut total_shares: i128 = 0;

    // Iterate through all configured Aquarius pools
    for pool_address in pool_addresses.iter() {
        // Step 1: Get the pool share token address
        // Aquarius pools have a separate token contract for LP shares
        let share_token_address: Address = env.invoke_contract(
            &pool_address,
            &Symbol::new(env, "share_id"),
            ().into_val(env),
        );

        // Step 2: Query user's balance of pool share tokens
        // The share token follows the standard Stellar token interface (SEP-0041)
        let user_shares: i128 = env.invoke_contract(
            &share_token_address,
            &Symbol::new(env, "balance"),
            (user_address,).into_val(env),
        );

        // Add to total with overflow protection
        total_shares = total_shares
            .checked_add(user_shares)
            .ok_or(crate::Error::Overflow)?;
    }

    Ok(total_shares)
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_read_aquarius_reserves_empty_pools() {
        let env = Env::default();
        let user = Address::generate(&env);
        let pools = Vec::new(&env);

        let result = read_aquarius_reserves(&env, &pools, &user);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), 0);
    }

    #[test]
    fn test_read_aquarius_reserves_overflow_protection() {
        // TODO: Add test for overflow protection once we have real implementation
    }
}
