#!/usr/bin/env node
import { hashReserveAddresses } from './src/lib/prover-standalone.js';

const addresses = ["GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"];
const result = await hashReserveAddresses(addresses);
console.log("Standalone result:");
console.log("  reserve_addresses_hash:", result.reserveAddressesHash);
console.log("  paddedAddresses:", result.paddedAddresses);
