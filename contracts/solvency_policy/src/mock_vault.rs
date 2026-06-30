#![cfg(test)]
//! Mock DeFindex Vault Contract for Testing
//!
//! Simulates a DeFindex yield vault that holds assets and issues vault shares.
//! Implements the core DeFindex vault interface:
//! - balance(user) -> user's vault shares
//! - total_supply() -> total vault shares issued
//! - fetch_total_managed_funds() -> total assets under management
//!
//! This mock simplifies testing by returning a Vec<i128> instead of the complex
//! AssetAllocation struct that real DeFindex vaults return.

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map, Vec};

#[contracttype]
pub enum DataKey {
    Balances,      // Map<Address, i128> - vault share balances per user
    TotalSupply,   // i128 - total vault shares issued
    TotalAssets,   // i128 - total assets under management (TVL)
}

#[contract]
pub struct MockVault;

#[contractimpl]
impl MockVault {
    /// Set total supply of vault shares (for testing)
    /// In a real vault, this would be managed by deposit/withdraw operations
    pub fn set_total_supply(env: Env, amount: i128) {
        env.storage().instance().set(&DataKey::TotalSupply, &amount);
    }

    /// Set total assets under management (for testing)
    /// This simulates the TVL (Total Value Locked) in the vault
    /// In a real vault, this would be calculated from actual holdings
    pub fn set_total_assets(env: Env, amount: i128) {
        env.storage().instance().set(&DataKey::TotalAssets, &amount);
    }

    /// Set vault share balance for a user (for testing)
    /// In a real vault, users receive shares when they deposit
    pub fn set_balance(env: Env, account: Address, amount: i128) {
        let mut balances: Map<Address, i128> = env
            .storage()
            .instance()
            .get(&DataKey::Balances)
            .unwrap_or(Map::new(&env));

        balances.set(account, amount);
        env.storage().instance().set(&DataKey::Balances, &balances);
    }

    /// Get user's vault share balance
    /// Mimics DeFindex vault's balance() function
    pub fn balance(env: Env, account: Address) -> i128 {
        let balances: Map<Address, i128> = env
            .storage()
            .instance()
            .get(&DataKey::Balances)
            .unwrap_or(Map::new(&env));

        balances.get(account).unwrap_or(0)
    }

    /// Get total supply of vault shares
    /// Mimics DeFindex vault's total_supply() function
    pub fn total_supply(env: Env) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0)
    }

    /// Get total managed funds in the vault
    /// Mimics DeFindex vault's fetch_total_managed_funds() function
    ///
    /// NOTE: In real DeFindex, this returns Vec<AssetAllocation> with complex structure.
    /// For testing, we simplify by returning Vec<i128> with just the total amount.
    /// The solvency_policy contract's extract_total_assets() function handles this.
    pub fn fetch_total_managed_funds(env: Env) -> Vec<i128> {
        let total_assets: i128 = env
            .storage()
            .instance()
            .get(&DataKey::TotalAssets)
            .unwrap_or(0);

        let mut result = Vec::new(&env);
        result.push_back(total_assets);
        result
    }
}
