#![cfg(test)]
//! Mock Aquarius Pool Contract for Testing
//!
//! Simulates an Aquarius AMM pool that returns pool share token address.
//! In real Aquarius pools, the pool contract has a separate token contract for LP shares.
//! This mock simplifies testing by having the pool act as its own share token.

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map};

#[contracttype]
pub enum DataKey {
    Balances,
    ShareTokenAddress,
}

#[contract]
pub struct MockPool;

#[contractimpl]
impl MockPool {
    /// Initialize pool with share token address
    /// In real pools, this would be set during pool creation
    pub fn set_share_token(env: Env, share_token: Address) {
        env.storage().instance().set(&DataKey::ShareTokenAddress, &share_token);
    }

    /// Get the pool share token address
    /// Mimics Aquarius pool's share_id() function
    pub fn share_id(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::ShareTokenAddress)
            .unwrap()
    }

    /// Initialize pool with balances for testing (on share token)
    pub fn set_balance(env: Env, account: Address, amount: i128) {
        let mut balances: Map<Address, i128> = env
            .storage()
            .instance()
            .get(&DataKey::Balances)
            .unwrap_or(Map::new(&env));

        balances.set(account, amount);
        env.storage().instance().set(&DataKey::Balances, &balances);
    }

    /// Standard balance function (like Aquarius pool share tokens)
    /// Returns pool share token balance for a given account
    pub fn balance(env: Env, account: Address) -> i128 {
        let balances: Map<Address, i128> = env
            .storage()
            .instance()
            .get(&DataKey::Balances)
            .unwrap_or(Map::new(&env));

        balances.get(account).unwrap_or(0)
    }
}
