#![cfg(test)]
//! Mock Aquarius Pool Contract for Testing
//!
//! Simulates an Aquarius AMM pool that returns pool share balances.
//! This allows us to test the Aquarius integration without deploying real pools.

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map};

#[contracttype]
pub enum DataKey {
    Balances,
}

#[contract]
pub struct MockPool;

#[contractimpl]
impl MockPool {
    /// Initialize pool with balances for testing
    pub fn set_balance(env: Env, account: Address, amount: i128) {
        let mut balances: Map<Address, i128> = env
            .storage()
            .instance()
            .get(&DataKey::Balances)
            .unwrap_or(Map::new(&env));

        balances.set(account, amount);
        env.storage().instance().set(&DataKey::Balances, &balances);
    }

    /// Standard balance function (like Aquarius pools)
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
