import StellarSdk from '@stellar/stellar-sdk';

console.log('SDK type:', typeof StellarSdk);
console.log('Has rpc?', 'rpc' in StellarSdk);
console.log('rpc type:', typeof StellarSdk.rpc);
console.log('rpc keys:', Object.keys(StellarSdk.rpc || {}));

if (StellarSdk.rpc) {
  console.log('\nrpc.Server type:', typeof StellarSdk.rpc.Server);
  console.log('Has Server?', 'Server' in StellarSdk.rpc);
}

// Also check contract
console.log('\ncontract type:', typeof StellarSdk.contract);
console.log('contract keys:', Object.keys(StellarSdk.contract || {}));
