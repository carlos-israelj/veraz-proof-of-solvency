.PHONY: build test clean deploy install-deps

# Variables
CONTRACT_DIR = solvency_policy
WASM_TARGET = wasm32-unknown-unknown
RELEASE_WASM = target/$(WASM_TARGET)/release/solvency_policy.wasm

# Build contract
build:
	@echo "Building Solvency Policy contract..."
	cd $(CONTRACT_DIR) && cargo build --target $(WASM_TARGET) --release
	@echo "✓ WASM built: $(RELEASE_WASM)"

# Build with stellar-cli (optimized)
build-optimized:
	@echo "Building with stellar-cli (optimized)..."
	cd $(CONTRACT_DIR) && stellar contract build
	@echo "✓ Optimized WASM ready"

# Run tests
test:
	@echo "Running contract tests..."
	cd $(CONTRACT_DIR) && cargo test
	@echo "✓ All tests passed"

# Run tests with output
test-verbose:
	@echo "Running tests (verbose)..."
	cd $(CONTRACT_DIR) && cargo test -- --nocapture

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	cd $(CONTRACT_DIR) && cargo clean
	@echo "✓ Cleaned"

# Install dependencies
install-deps:
	@echo "Installing dependencies..."
	rustup target add $(WASM_TARGET)
	cargo install --locked stellar-cli
	@echo "✓ Dependencies installed"

# Check code
check:
	@echo "Checking code..."
	cd $(CONTRACT_DIR) && cargo check
	cd $(CONTRACT_DIR) && cargo clippy -- -D warnings

# Format code
fmt:
	@echo "Formatting code..."
	cd $(CONTRACT_DIR) && cargo fmt

# Generate docs
docs:
	@echo "Generating documentation..."
	cd $(CONTRACT_DIR) && cargo doc --no-deps --open

# Deploy to testnet (requires CONTRACT_ID to be set)
deploy-testnet:
	@echo "Deploying to testnet..."
	stellar contract deploy \
		--wasm $(RELEASE_WASM) \
		--source issuer \
		--network testnet

# All: build + test
all: build test
	@echo "✓ Build and test completed successfully"

help:
	@echo "Veraz Contracts - Available targets:"
	@echo ""
	@echo "  make build            - Build contract (release)"
	@echo "  make build-optimized  - Build with stellar-cli optimization"
	@echo "  make test             - Run tests"
	@echo "  make test-verbose     - Run tests with output"
	@echo "  make clean            - Clean build artifacts"
	@echo "  make install-deps     - Install Rust dependencies"
	@echo "  make check            - Run cargo check + clippy"
	@echo "  make fmt              - Format code"
	@echo "  make docs             - Generate and open documentation"
	@echo "  make all              - Build + test"
	@echo "  make help             - Show this help"
