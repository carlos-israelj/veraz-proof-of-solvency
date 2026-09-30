// Debug script to inspect raw return value from is_solvent
import * as StellarSdk from '@stellar/stellar-sdk';

const CONTRACT_ID = "CDYE4ABSXKJSZU2RLO3WIZG7IIMAYTBINUMB2FDUTJBUMUFSA5IVJLRB";
const RPC_URL = "https://soroban-testnet.stellar.org";
const READONLY_SOURCE = "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";

const rpc = new StellarSdk.rpc.Server(RPC_URL);

async function debugIsSolvent() {
    console.log('═══════════════════════════════════════════════');
    console.log('  Debug: is_solvent Return Value');
    console.log('═══════════════════════════════════════════════\n');

    console.log('Contract ID:', CONTRACT_ID);
    console.log('RPC URL:', RPC_URL);
    console.log('\nSimulating is_solvent call...\n');

    try {
        const account = new StellarSdk.Account(READONLY_SOURCE, "0");
        const contract = new StellarSdk.Contract(CONTRACT_ID);

        const tx = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(contract.call("is_solvent"))
            .setTimeout(30)
            .build();

        const sim = await rpc.simulateTransaction(tx);

        if (StellarSdk.rpc.Api.isSimulationError(sim)) {
            console.error('❌ Simulation error:', sim.error);
            return;
        }

        const retval = sim.result?.retval;

        console.log('Raw retval:', retval);
        console.log('\nRetval type:', retval?._switch?.name);
        console.log('\nRetval value:', retval?._value);

        // Try to inspect the structure
        if (retval?._switch?.name === 'scvVec') {
            console.log('\nVector detected, inspecting Option<Attestation>...');
            if (retval._value?.[0]) {
                console.log('Option variant:', retval._value[0]);
            }
        } else if (retval?._switch?.name === 'scvMap') {
            console.log('\nMap detected (Attestation struct)');
            console.log('Map entries:', retval._value?.length);

            // Try to extract fields
            for (const entry of retval._value || []) {
                const key = entry.key();
                const val = entry.val();
                console.log(`  - Key: ${key._value}, Val type: ${val._switch?.name}`);
            }
        }

        console.log('\n─────────────────────────────────────────────────');
        console.log('Attempting scValToNative conversion...\n');

        try {
            const result = StellarSdk.scValToNative(retval);
            console.log('✅ Success! Native value:');
            console.log(result);
            console.log('\nField types:');
            console.log('  solvent:', typeof result.solvent, '=', result.solvent);
            console.log('  reserves:', typeof result.reserves, '=', result.reserves.toString());
            console.log('  sac_balance:', typeof result.sac_balance, '=', result.sac_balance.toString());
            console.log('  aquarius_balance:', typeof result.aquarius_balance, '=', result.aquarius_balance.toString());
            console.log('  defindex_balance:', typeof result.defindex_balance, '=', result.defindex_balance.toString());
            console.log('  liabilities:', typeof result.liabilities, '=', result.liabilities.toString());
            console.log('  ledger_seq:', typeof result.ledger_seq, '=', result.ledger_seq);
            console.log('  timestamp:', typeof result.timestamp, '=', result.timestamp.toString());
        } catch (e) {
            console.error('❌ scValToNative failed:', e.message);
            console.error('\nFull error:', e);

            // Try manual parsing
            console.log('\n─────────────────────────────────────────────────');
            console.log('Attempting manual parsing...\n');

            if (retval?._switch?.name === 'scvVec' && retval._value?.length === 1) {
                // This is likely Option<Attestation> represented as Vec with 1 element (Some)
                const optionValue = retval._value[0];
                console.log('Option value type:', optionValue._switch?.name);

                if (optionValue._switch?.name === 'scvMap') {
                    console.log('Found Attestation struct in Option');
                    const attestation = {};

                    for (const entry of optionValue._value || []) {
                        const keyScVal = entry.key();
                        const valScVal = entry.val();

                        // Extract key name
                        const keyName = keyScVal._value?.toString();

                        // Extract value based on type
                        let value;
                        const valType = valScVal._switch?.name;

                        if (valType === 'scvBool') {
                            value = valScVal._value;
                        } else if (valType === 'scvU32') {
                            value = valScVal._value;
                        } else if (valType === 'scvU64') {
                            value = valScVal._value?.toString();
                        } else if (valType === 'scvI128') {
                            const i128 = valScVal._value;
                            const hi = BigInt(i128.hi()._value || 0);
                            const lo = BigInt(i128.lo()._value || 0);
                            value = ((hi << 64n) + lo).toString();
                        } else {
                            value = `[${valType}]`;
                        }

                        attestation[keyName] = value;
                    }

                    console.log('\n✅ Manual parsing successful:');
                    console.log(JSON.stringify(attestation, null, 2));
                }
            }
        }

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        console.error(error.stack);
    }

    console.log('\n═══════════════════════════════════════════════\n');
}

debugIsSolvent().catch(console.error);
