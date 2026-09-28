# Veraz — Zero-Knowledge Proof of Solvency

<div align="center">
  <img src="public/veraz-symbol-dark-256.png" alt="Veraz Logo" width="120" />
  
  **Privacy-preserving solvency attestations for Stellar blockchain**
  
  [![Live Demo](https://img.shields.io/badge/demo-veraz--pos.xyz-3E4FB5?style=for-the-badge)](http://veraz-pos.xyz)
  [![Stellar](https://img.shields.io/badge/Stellar-Testnet-0E7C63?style=for-the-badge)](https://stellar.org)
  [![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
</div>

---

## 🎯 Overview

Veraz is a **production-ready Zero-Knowledge Proof of Solvency system** for Stellar/Soroban that enables stablecoin and RWA issuers to cryptographically prove `Reserves ≥ Liabilities` without revealing individual holder balances.

**Key Innovation**: The ONLY solution that verifies solvency across SAC balances, AMM liquidity pools (Aquarius), and yield vaults (DeFindex) with Zero-Knowledge privacy.

**🌐 Live Demo**: [veraz-pos.xyz](http://veraz-pos.xyz)

## ✨ Features

- 🔐 **Zero-Knowledge Privacy** - UltraHonk proofs, Noir circuits, no trusted setup
- 🌐 **Multi-Source Verification** - SAC wallets + Aquarius pools + DeFindex vaults
- ⚡ **Fast** - ~3s proof generation, 2KB constant size
- 🎨 **Professional Design** - Veraz brand system, WCAG AA compliant
- 📱 **Responsive** - Mobile-first, dark mode
- 🔓 **Trustless** - 100% client-side proving, on-chain verification

## 🚀 Quick Start

```bash
git clone https://github.com/carlos-israelj/veraz-proof-of-solvency.git
cd veraz-proof-of-solvency
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📖 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete project documentation
- **[Brand Kit](veraz-brand/README.md)** - Design guidelines
- **[DeFindex Integration](DEFINDEX_INTEGRATION_GUIDE.md)** - Vault integration guide

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Geist typography
- **ZK**: Noir 1.0, UltraHonk, @aztec/bb.js
- **Smart Contracts**: Soroban (Rust), Stellar SDK
- **Integrations**: DeFindex, Aquarius, Freighter wallet

## 📊 Performance

| Metric | Value |
|--------|-------|
| Proof Generation | ~3 seconds |
| Proof Size | 2 KB (constant) |
| Security | 128-bit (BN254) |
| Browser Support | Chrome, Firefox, Safari |

## 🔗 Links

- **Live Demo**: [veraz-pos.xyz](http://veraz-pos.xyz)
- **Testnet Contract**: [CCKXS7Y...HE7PX6](https://stellar.expert/explorer/testnet/contract/CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6)
- **Stellar Docs**: [developers.stellar.org](https://developers.stellar.org)

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

<div align="center">
  <strong>Built for the Stellar ecosystem</strong>
  <br/>
  <sub>Generated with Claude Code</sub>
</div>
