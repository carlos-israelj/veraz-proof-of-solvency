// Query Aquarius AMM pools information
// Based on: https://docs.aqua.network/developers/contracts/get-pools-info

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
// Configuration for TESTNET
// ==========================

// Dummy public key for read-only simulations
const USER_PUBLIC_KEY = 'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA';

// Testnet RPC
const SOROBAN_SERVER = 'https://soroban-testnet.stellar.org';

// Aquarius Router Contract ID (TESTNET)
// NOTE: This needs to be verified - may not exist on testnet
const ROUTER_CONTRACT_ID_TESTNET = 'CBQDHNBFBZYE4MKPWBSJOPIYLW4SFSXAXUTSXJN76GNKYVYPCKWC6QUK';

// Mainnet configuration for reference
const ROUTER_CONTRACT_ID_MAINNET = 'CBQDHNBFBZYE4MKPWBSJOPIYLW4SFSXAXUTSXJN76GNKYVYPCKWC6QUK';
const SOROBAN_SERVER_MAINNET = 'https://mainnet.sorobanrpc.com';

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

async function getPools(server, routerId, tokensContactIds, networkPassphrase) {
    try {
        const contract = new Contract(routerId);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase,
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

async function getPoolInfo(server, poolId, networkPassphrase) {
    try {
        const contract = new Contract(poolId);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase,
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

async function queryAquariusAPI(network = 'mainnet') {
    const baseApi = network === 'testnet'
        ? 'https://amm-api.aqua.network/api/external/v1' // May not have testnet endpoint
        : 'https://amm-api.aqua.network/api/external/v1';

    console.log(`\n🔍 Querying Aquarius API for ${network}...\n`);

    try {
        const response = await fetch(`${baseApi}/pools/?limit=10`);
        if (!response.ok) {
            throw new Error(`API responded with ${response.status}`);
        }

        const data = await response.json();

        console.log(`Found ${data.count} total pools`);
        console.log(`\nShowing first ${data.results.length} pools:\n`);

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
    console.log('  Aquarius AMM Pools Query Tool');
    console.log('═══════════════════════════════════════════════\n');

    // Query API first (easier and faster)
    console.log('📡 METHOD 1: Querying Aquarius Backend API');
    console.log('───────────────────────────────────────────────');

    const mainnetPools = await queryAquariusAPI('mainnet');

    // Try on-chain query for mainnet
    if (mainnetPools.length > 0) {
        console.log('\n📡 METHOD 2: Querying On-Chain (Mainnet)');
        console.log('───────────────────────────────────────────────\n');

        const server = new rpc.Server(SOROBAN_SERVER_MAINNET);

        // Try XLM/AQUA pool
        const tokenA = Asset.native();
        const tokenB = new Asset('AQUA', 'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA');

        const tokenAContractId = tokenA.contractId(Networks.PUBLIC);
        const tokenBContractId = tokenB.contractId(Networks.PUBLIC);

        console.log('Querying XLM/AQUA pools on mainnet...\n');

        const pools = await getPools(
            server,
            ROUTER_CONTRACT_ID_MAINNET,
            [tokenAContractId, tokenBContractId],
            Networks.PUBLIC
        );

        if (pools.length > 0) {
            console.log(`✅ Found ${pools.length} pools on-chain:\n`);

            for (const [poolId, poolHash] of pools) {
                console.log(`Pool ID: ${poolId}`);
                console.log(`Hash: ${poolHash}`);

                const info = await getPoolInfo(server, poolId, Networks.PUBLIC);
                if (info) {
                    console.log('Info:', JSON.stringify(info, null, 2));
                }
                console.log('');
            }
        } else {
            console.log('No pools found on-chain');
        }
    }

    // Summary for Veraz integration
    console.log('\n═══════════════════════════════════════════════');
    console.log('  Integration Summary for Veraz');
    console.log('═══════════════════════════════════════════════\n');

    console.log('⚠️  IMPORTANT NOTES:\n');
    console.log('1. Your Veraz system is deployed on TESTNET');
    console.log('2. Aquarius pools shown above are from MAINNET');
    console.log('3. To enable Aquarius integration, you need:');
    console.log('   a) Find Aquarius pools on TESTNET (if available)');
    console.log('   b) OR deploy to MAINNET to use these pools');
    console.log('');
    console.log('4. Current configuration has: aquarius_pools: []');
    console.log('5. To enable, add pool addresses like:');
    console.log('   aquarius_pools: [');
    console.log('     {"address": "POOL_ADDRESS_1"},');
    console.log('     {"address": "POOL_ADDRESS_2"}');
    console.log('   ]');
    console.log('');
    console.log('📌 Example mainnet pools (XLM/AQUA):');
    mainnetPools.slice(0, 3).forEach(pool => {
        console.log(`   - ${pool.address} (fee: ${pool.fee})`);
    });
}

main().catch(console.error);
