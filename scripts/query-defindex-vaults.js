// Query DeFindex Vaults on TESTNET
// Based on: https://docs.defindex.io/

import * as StellarSdk from '@stellar/stellar-sdk';

const {
    Contract,
    TransactionBuilder,
    rpc,
    BASE_FEE,
    Networks,
    TimeoutInfinite,
    Address,
} = StellarSdk;

// ==========================
// TESTNET Configuration
// ==========================

// DeFindex Factory on TESTNET
const DEFINDEX_FACTORY = 'CDSCWE4GLNBYYTES2OCYDFQA2LLY4RBIAX6ZI32VSUXD7GO6HRPO4A32';

// Known DeFindex Vaults on TESTNET
const DEFINDEX_VAULTS = [
    {
        name: 'USDC Vault',
        address: 'CBMVK2JK6NTOT2O4HNQAIQFJY232BHKGLIMXDVQVHIIZKDACXDFZDWHN',
        asset: 'USDC'
    },
    {
        name: 'XLM Vault',
        address: 'CCLV4H7WTLJQ7ATLHBBQV2WW3OINF3FOY5XZ7VPHZO7NH3D2ZS4GFSF6',
        asset: 'XLM'
    },
    {
        name: 'CETES Vault',
        address: 'CBIS5TEMTNNOTBE3WXPQUAGUEDYZZVIWAKTXEQCOUJ34OJJ3FJ5NLF2P',
        asset: 'CETES'
    }
];

// Testnet RPC
const SOROBAN_SERVER = 'https://soroban-testnet.stellar.org:443';

// Dummy public key for read-only simulations
const USER_PUBLIC_KEY = 'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA';

// ==========================
// Utility Functions
// ==========================

function scValToInt(scVal) {
    try {
        // Handle different ScVal types
        if (scVal._switch?.name === 'scvI128') {
            const value = scVal._value;
            // Convert i128 to number (assumes value fits in safe integer range)
            const hi = BigInt(value.hi()._value);
            const lo = BigInt(value.lo()._value);
            const result = (hi << 64n) + lo;

            if (result <= BigInt(Number.MAX_SAFE_INTEGER)) {
                return Number(result);
            } else {
                console.warn("Value exceeds JavaScript's safe integer range");
                return result.toString();
            }
        } else if (scVal._switch?.name === 'scvU128') {
            const value = scVal._value;
            const hi = BigInt(value.hi()._value);
            const lo = BigInt(value.lo()._value);
            const result = (hi << 64n) + lo;

            if (result <= BigInt(Number.MAX_SAFE_INTEGER)) {
                return Number(result);
            } else {
                return result.toString();
            }
        }

        // Fallback for other types
        return scVal._value?.toString() || 'N/A';
    } catch (error) {
        console.error('Error converting ScVal:', error.message);
        return 'Error';
    }
}

function formatAmount(amount, decimals = 7) {
    if (typeof amount === 'string') {
        // Handle big int strings
        const num = BigInt(amount);
        const divisor = BigInt(10 ** decimals);
        const whole = num / divisor;
        const fraction = num % divisor;
        return `${whole}.${fraction.toString().padStart(decimals, '0')}`;
    }
    return (amount / (10 ** decimals)).toFixed(decimals);
}

// ==========================
// Query Functions
// ==========================

async function queryVaultBalance(server, vaultAddress, userAddress) {
    try {
        const contract = new Contract(vaultAddress);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const userAddr = Address.fromString(userAddress);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                contract.call('balance', userAddr.toScVal())
            )
            .setTimeout(TimeoutInfinite)
            .build();

        const simulateResult = await server.simulateTransaction(tx);

        if (!simulateResult.result) {
            throw new Error('No result from simulation');
        }

        return scValToInt(simulateResult.result.retval);
    } catch (error) {
        console.error(`Error querying balance:`, error.message);
        return 0;
    }
}

async function queryVaultTotalSupply(server, vaultAddress) {
    try {
        const contract = new Contract(vaultAddress);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                contract.call('total_supply')
            )
            .setTimeout(TimeoutInfinite)
            .build();

        const simulateResult = await server.simulateTransaction(tx);

        if (!simulateResult.result) {
            throw new Error('No result from simulation');
        }

        return scValToInt(simulateResult.result.retval);
    } catch (error) {
        console.error(`Error querying total supply:`, error.message);
        return 0;
    }
}

async function queryVaultManagedFunds(server, vaultAddress) {
    try {
        const contract = new Contract(vaultAddress);
        const account = await server.getAccount(USER_PUBLIC_KEY);

        const tx = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                contract.call('fetch_total_managed_funds')
            )
            .setTimeout(TimeoutInfinite)
            .build();

        const simulateResult = await server.simulateTransaction(tx);

        if (!simulateResult.result) {
            throw new Error('No result from simulation');
        }

        // The return value is Vec<AssetAllocation> which is a complex structure
        // According to DeFindex docs, AssetAllocation contains:
        // - address: Address (the asset contract)
        // - strategies: Vec<Strategy>
        // - total_amount: i128 (the total managed funds)
        const retval = simulateResult.result.retval;

        // If it's a vector, iterate and sum total_amount from each asset
        if (retval._switch?.name === 'scvVec' && retval._value?.length > 0) {
            let totalAmount = 0;

            // Each element in the vector is an AssetAllocation struct (Map)
            for (const allocation of retval._value) {
                if (allocation._switch?.name === 'scvMap') {
                    const mapEntries = allocation._value;
                    // Find the 'total_amount' key in the map
                    for (const entry of mapEntries) {
                        const keyStr = entry.key()._value?.toString();
                        if (keyStr === 'total_amount') {
                            const amount = scValToInt(entry.val());
                            if (typeof amount === 'number') {
                                totalAmount += amount;
                            } else if (typeof amount === 'string') {
                                totalAmount += Number(amount);
                            }
                            break;
                        }
                    }
                }
            }

            return totalAmount;
        }

        return 0;
    } catch (error) {
        console.error(`Error querying managed funds:`, error.message);
        return 0;
    }
}

async function queryVaultInfo(server, vault) {
    console.log(`\n📊 ${vault.name} (${vault.asset})`);
    console.log(`   Address: ${vault.address}`);
    console.log(`   ─────────────────────────────────────────────────`);

    try {
        // Query total supply
        const totalSupply = await queryVaultTotalSupply(server, vault.address);
        console.log(`   Total Supply (shares): ${formatAmount(totalSupply)}`);

        // Query total managed funds
        const managedFunds = await queryVaultManagedFunds(server, vault.address);
        console.log(`   Total Managed Funds:   ${formatAmount(managedFunds)} ${vault.asset}`);

        // Calculate share value if both values are available
        if (totalSupply > 0 && managedFunds > 0) {
            const shareValue = managedFunds / totalSupply;
            console.log(`   Value per Share:       ${shareValue.toFixed(7)} ${vault.asset}`);
        }

        // Query balance for a test user (will be 0 for dummy address)
        const userBalance = await queryVaultBalance(server, vault.address, USER_PUBLIC_KEY);
        console.log(`   Test User Balance:     ${formatAmount(userBalance)} shares`);

        return {
            address: vault.address,
            name: vault.name,
            asset: vault.asset,
            totalSupply,
            managedFunds,
            userBalance,
        };
    } catch (error) {
        console.error(`   ❌ Error querying vault: ${error.message}`);
        return null;
    }
}

// ==========================
// Main Execution
// ==========================

async function main() {
    console.log('═══════════════════════════════════════════════');
    console.log('  DeFindex TESTNET Vaults Query');
    console.log('═══════════════════════════════════════════════\n');

    console.log('Configuration:');
    console.log(`  Factory: ${DEFINDEX_FACTORY}`);
    console.log(`  RPC:     ${SOROBAN_SERVER}`);
    console.log(`  Vaults:  ${DEFINDEX_VAULTS.length} configured\n`);

    const server = new rpc.Server(SOROBAN_SERVER);

    console.log('📡 Querying DeFindex Vaults on Testnet...');
    console.log('───────────────────────────────────────────────');

    const results = [];

    for (const vault of DEFINDEX_VAULTS) {
        const info = await queryVaultInfo(server, vault);
        if (info) {
            results.push(info);
        }
    }

    // Integration guide
    console.log('\n\n═══════════════════════════════════════════════');
    console.log('  Integration Guide for Veraz');
    console.log('═══════════════════════════════════════════════\n');

    if (results.length > 0) {
        console.log('✅ GOOD NEWS: DeFindex vaults are available on testnet!\n');
        console.log('📝 To enable DeFindex integration in your Veraz system:\n');
        console.log('1. Update SolvencyPolicy initialize() configuration:\n');
        console.log('   defindex_vaults: vec![');
        console.log('     &env,');

        results.forEach((vault, idx) => {
            const comma = idx < results.length - 1 ? ',' : '';
            console.log(`     Address::from_string(&String::from_str(&env, "${vault.address}"))${comma}`);
        });

        console.log('   ]\n');
        console.log('2. The contract will automatically:');
        console.log('   - Query user vault shares via balance()');
        console.log('   - Query total vault supply via total_supply()');
        console.log('   - Query total managed funds via fetch_total_managed_funds()');
        console.log('   - Convert shares to asset value: (user_shares * total_assets) / total_supply\n');

        console.log('3. Example calculation:');
        if (results[0]) {
            const vault = results[0];
            console.log(`   If user has 1000 shares in ${vault.name}:`);
            const totalSupply = typeof vault.totalSupply === 'string' ? BigInt(vault.totalSupply) : vault.totalSupply;
            const managedFunds = typeof vault.managedFunds === 'string' ? BigInt(vault.managedFunds) : vault.managedFunds;
            if (totalSupply > 0) {
                const userShares = 1000;
                const assetValue = (userShares * Number(managedFunds)) / Number(totalSupply);
                console.log(`   Asset Value = (1000 * ${formatAmount(managedFunds)}) / ${formatAmount(totalSupply)}`);
                console.log(`   Asset Value = ${formatAmount(assetValue)} ${vault.asset}`);
            }
        }

        console.log('\n4. Redeploy SolvencyPolicy contract with updated Config\n');

        console.log('📌 Available vaults for integration:');
        results.forEach((vault, idx) => {
            console.log(`   ${idx + 1}. ${vault.name}`);
            console.log(`      ${vault.address}`);
            console.log(`      TVL: ${formatAmount(vault.managedFunds)} ${vault.asset}`);
        });
    } else {
        console.log('⚠️  Could not query DeFindex vaults on testnet');
        console.log('   This might be temporary - check network status');
        console.log('   Visit https://docs.defindex.io for more info');
    }

    console.log('\n═══════════════════════════════════════════════\n');
}

main().catch(console.error);
