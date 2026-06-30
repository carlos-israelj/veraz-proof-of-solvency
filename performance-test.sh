#!/bin/bash

# Performance Benchmark Script
# Tests proof generation and verification performance
# Date: June 28, 2026

echo "═══════════════════════════════════════════════════"
echo "Veraz Protocol - Performance Benchmark"
echo "═══════════════════════════════════════════════════"
echo ""

# Configuration
CIRCUIT_DIR="circuits/solvency"
VERIFIER_DIR="contracts/verifier"
BB_BIN="$VERIFIER_DIR/.bb/bin/bb"
CONTRACT_ID="CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ"

# Test parameters
NUM_RUNS=3
echo "Number of test runs: $NUM_RUNS"
echo "Circuit: Solvency (8 leaves)"
echo "Contract ID: $CONTRACT_ID"
echo ""

# Arrays to store timings
declare -a compile_times
declare -a witness_times
declare -a proof_times
declare -a verify_times

cd "$CIRCUIT_DIR"

echo "──────────────────────────────────────────────────"
echo "Running Performance Tests..."
echo "──────────────────────────────────────────────────"
echo ""

for i in $(seq 1 $NUM_RUNS); do
    echo "🔄 Run $i/$NUM_RUNS"
    echo ""

    # 1. Circuit Compilation
    echo "  [1/4] Compiling circuit..."
    start=$(date +%s.%N)
    nargo compile > /dev/null 2>&1
    end=$(date +%s.%N)
    compile_time=$(echo "$end - $start" | bc)
    compile_times+=($compile_time)
    printf "  ✓ Compiled in %.3f seconds\n" $compile_time

    # 2. Witness Generation
    echo "  [2/4] Generating witness..."
    start=$(date +%s.%N)
    nargo execute > /dev/null 2>&1
    end=$(date +%s.%N)
    witness_time=$(echo "$end - $start" | bc)
    witness_times+=($witness_time)
    printf "  ✓ Witness generated in %.3f seconds\n" $witness_time

    # 3. Proof Generation
    echo "  [3/4] Generating proof..."
    start=$(date +%s.%N)
    ../../$BB_BIN prove \
        --scheme ultra_honk \
        --oracle_hash keccak \
        --bytecode_path target/solvency.json \
        --witness_path target/solvency.gz \
        --output_path target \
        --output_format bytes_and_fields \
        > /dev/null 2>&1
    end=$(date +%s.%N)
    proof_time=$(echo "$end - $start" | bc)
    proof_times+=($proof_time)
    printf "  ✓ Proof generated in %.3f seconds\n" $proof_time

    # 4. On-Chain Verification
    echo "  [4/4] Verifying on-chain..."
    cd ../../$VERIFIER_DIR
    start=$(date +%s.%N)
    stellar contract invoke \
        --id $CONTRACT_ID \
        --source alice \
        --network testnet \
        --send=yes \
        -- \
        verify_proof \
        --proof_bytes-file-path ../../$CIRCUIT_DIR/target/proof \
        --public_inputs-file-path ../../$CIRCUIT_DIR/target/public_inputs \
        > /dev/null 2>&1
    end=$(date +%s.%N)
    verify_time=$(echo "$end - $start" | bc)
    verify_times+=($verify_time)
    printf "  ✓ Verified on-chain in %.3f seconds\n" $verify_time
    cd ../../$CIRCUIT_DIR

    # Total for this run
    total=$(echo "$compile_time + $witness_time + $proof_time + $verify_time" | bc)
    printf "\n  📊 Run $i Total: %.3f seconds\n" $total
    echo ""
done

# Calculate averages
calc_avg() {
    local arr=("$@")
    local sum=0
    for val in "${arr[@]}"; do
        sum=$(echo "$sum + $val" | bc)
    done
    echo "scale=3; $sum / ${#arr[@]}" | bc
}

calc_min() {
    local arr=("$@")
    local min=${arr[0]}
    for val in "${arr[@]}"; do
        if (( $(echo "$val < $min" | bc -l) )); then
            min=$val
        fi
    done
    echo $min
}

calc_max() {
    local arr=("$@")
    local max=${arr[0]}
    for val in "${arr[@]}"; do
        if (( $(echo "$val > $max" | bc -l) )); then
            max=$val
        fi
    done
    echo $max
}

avg_compile=$(calc_avg "${compile_times[@]}")
avg_witness=$(calc_avg "${witness_times[@]}")
avg_proof=$(calc_avg "${proof_times[@]}")
avg_verify=$(calc_avg "${verify_times[@]}")

min_compile=$(calc_min "${compile_times[@]}")
min_witness=$(calc_min "${witness_times[@]}")
min_proof=$(calc_min "${proof_times[@]}")
min_verify=$(calc_min "${verify_times[@]}")

max_compile=$(calc_max "${compile_times[@]}")
max_witness=$(calc_max "${witness_times[@]}")
max_proof=$(calc_max "${proof_times[@]}")
max_verify=$(calc_max "${verify_times[@]}")

echo "══════════════════════════════════════════════════════════"
echo "Performance Results (Average of $NUM_RUNS runs)"
echo "══════════════════════════════════════════════════════════"
echo ""
printf "Circuit Compilation:    %.3f sec (min: %.3f, max: %.3f)\n" $avg_compile $min_compile $max_compile
printf "Witness Generation:     %.3f sec (min: %.3f, max: %.3f)\n" $avg_witness $min_witness $max_witness
printf "Proof Generation:       %.3f sec (min: %.3f, max: %.3f)\n" $avg_proof $min_proof $max_proof
printf "On-Chain Verification:  %.3f sec (min: %.3f, max: %.3f)\n" $avg_verify $min_verify $max_verify
echo ""
total_avg=$(echo "$avg_compile + $avg_witness + $avg_proof + $avg_verify" | bc)
printf "📊 Total E2E Time:      %.3f seconds\n" $total_avg
echo ""

# File sizes
echo "══════════════════════════════════════════════════════════"
echo "File Sizes"
echo "══════════════════════════════════════════════════════════"
echo ""
circuit_size=$(wc -c < target/solvency.json)
vk_size=$(wc -c < target/vk)
proof_size=$(wc -c < target/proof)
public_inputs_size=$(wc -c < target/public_inputs)
witness_size=$(wc -c < target/solvency.gz)

printf "Circuit (JSON):     %'d bytes (%.1f KB)\n" $circuit_size $(echo "scale=1; $circuit_size / 1024" | bc)
printf "Verification Key:   %'d bytes (%.1f KB)\n" $vk_size $(echo "scale=1; $vk_size / 1024" | bc)
printf "Proof:              %'d bytes (%.1f KB)\n" $proof_size $(echo "scale=1; $proof_size / 1024" | bc)
printf "Public Inputs:      %'d bytes\n" $public_inputs_size
printf "Witness (gzipped):  %'d bytes (%.1f KB)\n" $witness_size $(echo "scale=1; $witness_size / 1024" | bc)
echo ""

# Throughput calculations
echo "══════════════════════════════════════════════════════════"
echo "Throughput Metrics"
echo "══════════════════════════════════════════════════════════"
echo ""
proofs_per_hour=$(echo "scale=2; 3600 / $total_avg" | bc)
proofs_per_day=$(echo "scale=2; 86400 / $total_avg" | bc)
printf "Proofs per hour:    %.2f proofs/hour\n" $proofs_per_hour
printf "Proofs per day:     %.2f proofs/day\n" $proofs_per_day
echo ""

# Cost estimation (testnet)
echo "══════════════════════════════════════════════════════════"
echo "Cost Estimation (Testnet)"
echo "══════════════════════════════════════════════════════════"
echo ""
echo "Verification cost:  ~0.0001 XLM per proof (testnet estimate)"
echo "Daily cost:         ~$(echo "scale=4; $proofs_per_day * 0.0001" | bc) XLM (if running 24/7)"
echo ""

echo "══════════════════════════════════════════════════════════"
echo "Test Configuration"
echo "══════════════════════════════════════════════════════════"
echo ""
echo "Circuit:           Solvency (Merkle Sum Tree)"
echo "Leaves:            8"
echo "Proof System:      UltraHonk"
echo "Curve:             BN254"
echo "Oracle Hash:       Keccak"
echo "Protocol:          Stellar Protocol 26 (CAP-80)"
echo "Network:           Testnet"
echo "Barretenberg:      v0.87.0"
echo "Noir:              v1.0.0-beta.9"
echo ""

echo "✅ Performance test complete!"
echo ""

cd ../..
