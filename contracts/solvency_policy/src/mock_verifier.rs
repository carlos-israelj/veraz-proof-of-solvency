#![cfg(test)]
//! Mock Verifier Contract for Testing
//!
//! This is a simple mock that always accepts proofs for testing purposes.
//! In production, the real UltraHonk verifier is used.

use soroban_sdk::{contract, contractimpl, Bytes, Env};

#[contract]
pub struct MockVerifier;

#[contractimpl]
impl MockVerifier {
    /// Mock verify_proof that always succeeds
    pub fn verify_proof(_env: Env, _public_inputs: Bytes, _proof: Bytes) {
        // Always accept - this is for testing only
    }
}
