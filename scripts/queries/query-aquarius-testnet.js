// Query Aquarius AMM pools on TESTNET
// Based on: https://docs.aqua.network/developers/prerequisites-and-basics

import * as StellarSdk from '@stellar/stellar-sdk';

const {
    Asset,
    Contract,
    TransactionBuilder,
    rpc,
    BASE_FEE,
    Networks,
    xdr,
    TimeoutInfinite,
    StrKey,
} = StellarSdk;

// ==========================
// TESTNET Configuration
// ==========================

// Router contract ID for TESTNET (updated February 2026)
const ROUTER_CONTRACT_ID = 'CBCFTQSPDBAIZ6R6PJQKSQWKNKWH2QIV3I4J72SHWBIK3ADRRAM5A6GD';

// Testnet RPC
const SOROBAN_SERVER = 'https://soroban-testnet.stellar.org:443';

// Testnet API
const BASE_API = 'https://amm-api-testnet.aqua.network/api/external/v1';

// Dummy public key for read-only simulations
const USER_PUBLIC_KEY = 'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA';

// ==========================
// Utility Functions
// ==========================

function orderTokensIds(tokensIds) {
    return tokensIds.sort((a, b) => {
        const aHash = BigInt('0x' + a.address().contractId().toString('hex'));
        const bHash = BigInt('0x' + b.address().contractId().toString('hex'));
        if (aHash < bHash) return -1;
        if (aHash > bHash) return 1;
        return 0;
    });
}

function u128ToInt(value) {
    const result = (BigInt(value.hi()._value) << 64n) + BigInt(value.lo()._value);
    if (result <= BigInt(Number.MAX_SAFE_INTEGER)) {
        return Number(result);
    } else {
        console.warn("Value exceeds JavaScript's safe integer range");
        return null;
    }
}

function contractIdToScVal(contractId) {
    return StellarSdk.Address.contract(StrKey.decodeContract(contractId)).toScVal();
}

// ==========================
// Query Functions
// ==========================

async function getPools(server, routerId, tokensContactIds) {
    try {
        const contract = new Contract(routerId);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                contract.call(
                    'get_pools',
                    xdr.ScVal.scvVec(
                        orderTokensIds(
                            tokensContactIds.map(id => contractIdToScVal(id))
                        )
                    )
                )
            )
            .setTimeout(TimeoutInfinite)
            .build();

        const simulateResult = await server.simulateTransaction(tx);

        if (!simulateResult.result) {
            return [];
        }

        const hashArray = simulateResult.result.retval.value();

        if (!hashArray.length) {
            return [];
        }

        return hashArray.map((item) => [
            StrKey.encodeContract(Buffer.from(item.val().value().value(), 'hex')),
            item.key().value().toString('hex'),
        ]);
    } catch (error) {
        console.error('Error getting pools:', error.message);
        return [];
    }
}

async function getPoolInfo(server, poolId) {
    try {
        const contract = new Contract(poolId);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                contract.call('get_info')
            )
            .setTimeout(TimeoutInfinite)
            .build();

        const simulateResult = await server.simulateTransaction(tx);

        if (!simulateResult.result) {
            throw new Error('No result from simulation');
        }

        return simulateResult.result.retval.value().reduce((acc, val) => {
            acc[val.key().value().toString()] =
                typeof val.val().value() === 'number'
                    ? val.val().value()
                    : val.val().value().hi
                        ? u128ToInt(val.val().value())
                        : val.val().value().toString();

            return acc;
        }, {});
    } catch (error) {
        console.error(`Error getting pool info for ${poolId}:`, error.message);
        return null;
    }
}

// ==========================
// API Query Functions
// ==========================

async function queryAquariusAPI() {
    console.log(`\n🔍 Querying Aquarius Testnet API...\n`);

    try {
        const response = await fetch(`${BASE_API}/pools/?limit=50`);
        if (!response.ok) {
            throw new Error(`API responded with ${response.status}`);
        }

        const data = await response.json();

        console.log(`Found ${data.count} total pools on TESTNET\n`);

        if (data.results.length === 0) {
            console.log('⚠️  No pools found on testnet');
            return [];
        }

        console.log(`Showing first ${data.results.length} pools:\n`);

        data.results.forEach((pool, idx) => {
            console.log(`${idx + 1}. Pool: ${pool.address}`);
            console.log(`   Tokens: ${pool.tokens_str.join(' / ')}`);
            console.log(`   Type: ${pool.pool_type}`);
            console.log(`   Fee: ${pool.fee}`);
            console.log('');
        });

        return data.results;
    } catch (error) {
        console.error('❌ Error querying API:', error.message);
        return [];
    }
}

// ==========================
// Main Execution
// ==========================

async function main() {
    console.log('═══════════════════════════════════════════════');
    console.log('  Aquarius TESTNET Pools Query');
    console.log('═══════════════════════════════════════════════\n');

    console.log('Configuration:');
    console.log(`  Router: ${ROUTER_CONTRACT_ID}`);
    console.log(`  RPC:    ${SOROBAN_SERVER}`);
    console.log(`  API:    ${BASE_API}\n`);

    // Query API first
    console.log('📡 METHOD 1: Querying Aquarius Backend API (Testnet)');
    console.log('───────────────────────────────────────────────');

    const testnetPools = await queryAquariusAPI();

    // Try on-chain query for testnet
    if (testnetPools.length > 0) {
        console.log('\n📡 METHOD 2: Querying On-Chain Router (Testnet)');
        console.log('───────────────────────────────────────────────\n');

        const server = new rpc.Server(SOROBAN_SERVER);

        // Try with first pool tokens from API results
        const firstPool = testnetPools[0];
        console.log(`Querying pools for: ${firstPool.tokens_str.join(' / ')}\n`);

        // Get contract IDs from first pool
        const tokenIds = firstPool.tokens_addresses;

        const pools = await getPools(
            server,
            ROUTER_CONTRACT_ID,
            tokenIds
        );

        if (pools.length > 0) {
            console.log(`✅ Found ${pools.length} pools on-chain:\n`);

            for (const [poolId, poolHash] of pools) {
                console.log(`Pool ID: ${poolId}`);
                console.log(`Hash: ${poolHash}`);

                const info = await getPoolInfo(server, poolId);
                if (info) {
                    console.log('Info:', JSON.stringify(info, null, 2));
                }
                console.log('');
            }
        } else {
            console.log('No pools found on-chain for these tokens');
        }
    }

    // Summary for Veraz integration
    console.log('\n═══════════════════════════════════════════════');
    console.log('  Integration Guide for Veraz');
    console.log('═══════════════════════════════════════════════\n');

    if (testnetPools.length > 0) {
        console.log('✅ GOOD NEWS: Aquarius pools ARE available on testnet!\n');
        console.log('📝 To enable Aquarius integration in your Veraz system:\n');
        console.log('1. Choose pool(s) from the list above');
        console.log('2. Update SolvencyPolicy configuration:');
        console.log('');
        console.log('   aquarius_pools: [');

        // Show first 3 pools as examples
        testnetPools.slice(0, 3).forEach((pool, idx) => {
            const comma = idx < Math.min(testnetPools.length, 3) - 1 ? ',' : '';
            console.log(`     {"address": "${pool.address}"}${comma}`);
        });

        console.log('   ]');
        console.log('');
        console.log('3. Redeploy SolvencyPolicy contract with new config');
        console.log('');
        console.log('📌 Recommended pools for testing:');
        testnetPools.slice(0, 5).forEach((pool, idx) => {
            console.log(`   ${idx + 1}. ${pool.address}`);
            console.log(`      ${pool.tokens_str.join(' / ')} (fee: ${pool.fee})`);
        });
    } else {
        console.log('⚠️  No pools found on testnet');
        console.log('   This might be temporary - testnet resets periodically');
        console.log('   Check https://aqua.network for testnet status');
    }

    console.log('\n═══════════════════════════════════════════════\n');
}

main().catch(console.error);
