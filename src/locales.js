export const t = {
  en: {
    // Landing
    appTitle: "Veraz",
    appSubtitle: "Cryptographic auditing with Zero-Knowledge on Stellar",
    auditorCardTitle: "Audit Exchange",
    auditorCardDesc: "Mathematically verify that reserves cover all liabilities without compromising privacy.",
    issuerCardTitle: "Prove Solvency",
    issuerCardDesc: "Generate a local cryptographic proof assuring your clients their funds are intact.",
    footerText: "Designed with Noir & Soroban technology",
    
    // Shared
    backBtn: "← Go Back",
    
    // Auditor Journey
    auditorHeaderTitle: "Cryptographic Audit",
    auditorHeaderDesc: "Mathematically verify that an issuer is not operating with fractional reserves.",
    searchPlaceholder: "Enter Issuer Contract ID...",
    btnAudit: "Audit",
    btnAuditing: "Searching...",
    errNoAttestation: "This contract does not have a ZK attestation published yet.",
    analyzingNetwork: "Analyzing network...",
    
    // Certificate
    certSolvent: "Solvency Certificate",
    certInsolvent: "Insolvency Alert",
    certSub: "Cryptographically verified on Soroban network",
    reservesLabel: "On-Chain Reserves (XLM)",
    liabilitiesLabel: "Proven Liabilities (ZK Proof)",
    verifiedBadge: "🔒 Verified: Liabilities ≤ Reserves",
    auditLabel: "Audit (Ledger Seq)",
    viewCryptoDetails: "View Cryptographic Details",
    
    // Issuer Wizard
    issuerHeaderTitle: "Proof of Solvency Issuance",
    issuerHeaderDesc: "Generate a ZK proof of your liabilities without revealing the identity or amounts of your clients.",
    step1Title: "Connect Identity",
    btnConnect: "Connect Freighter",
    step2Title: "Enter Private Liabilities",
    step2Desc: "Enter client balances. The cryptographic circuit will hide this information permanently.",
    balancesPlaceholder: "10000, 20000, ...",
    inputsRequired: "Inputs Required",
    contractIdPlaceholder: "Target Contract ID",
    btnGenerateProof: "Generate Cryptographic Proof →",
    
    // ZK Loader
    zkProgressTitle: "ZK Computation in Progress",
    zkMsg1: "Downloading WASM circuit...",
    zkMsg2: "Building Merkle Tree with hidden balances...",
    zkMsg3: "Generating ZK Proof (UltraHonk) - May take 10~30s...",
    zkMsg4: "Preparing transaction for Soroban...",
    triviaTitle: "Did you know?",
    triviaList: [
      "Stellar processes thousands of transactions per second for a fraction of a cent.",
      "Zero-Knowledge proofs let you prove a mathematical truth without revealing the underlying data.",
      "Veraz uses UltraHonk, an advanced cryptography backend, right in your browser.",
      "Soroban is Stellar's smart contract platform built on Rust and WebAssembly.",
      "With Veraz, clients can verify their exchanges are solvent without trusting a third-party auditor."
    ],
    
    // Success
    proofAccepted: "Proof Accepted",
    proofAcceptedDesc: "The Soroban network has verified and accepted your proof of solvency.",
    txHashLabel: "Transaction hash:",
  },
  
  es: {
    // Landing
    appTitle: "Veraz",
    appSubtitle: "Auditoría criptográfica con Zero-Knowledge en Stellar",
    auditorCardTitle: "Auditar Exchange",
    auditorCardDesc: "Verifica matemáticamente que las reservas cubren todos los pasivos sin comprometer privacidad.",
    issuerCardTitle: "Probar Solvencia",
    issuerCardDesc: "Genera una prueba criptográfica local que asegura a tus clientes que sus fondos están íntegros.",
    footerText: "Diseñado con tecnología Noir & Soroban",
    
    // Shared
    backBtn: "← Volver",
    
    // Auditor Journey
    auditorHeaderTitle: "Auditoría Criptográfica",
    auditorHeaderDesc: "Verifica matemáticamente que un emisor no opera con reserva fraccionaria.",
    searchPlaceholder: "Ingresa el Contract ID del Emisor...",
    btnAudit: "Auditar",
    btnAuditing: "Buscando...",
    errNoAttestation: "Este contrato aún no tiene una atestación ZK publicada.",
    analyzingNetwork: "Analizando red...",
    
    // Certificate
    certSolvent: "Certificado de Solvencia",
    certInsolvent: "Alerta de Insolvencia",
    certSub: "Verificado criptográficamente en la red Soroban",
    reservesLabel: "Reservas On-Chain (XLM)",
    liabilitiesLabel: "Pasivos Probados (ZK Proof)",
    verifiedBadge: "🔒 Verificado: Pasivos ≤ Reservas",
    auditLabel: "Auditoría (Ledger Seq)",
    viewCryptoDetails: "Ver Detalles Criptográficos",
    
    // Issuer Wizard
    issuerHeaderTitle: "Emisión de Solvencia",
    issuerHeaderDesc: "Genera una prueba ZK de tus pasivos sin revelar la identidad ni los montos de tus clientes.",
    step1Title: "Conectar Identidad",
    btnConnect: "Conectar Freighter",
    step2Title: "Ingresar Pasivos Privados",
    step2Desc: "Ingresa los saldos de los clientes. El circuito criptográfico ocultará esta información permanentemente.",
    balancesPlaceholder: "10000, 20000, ...",
    inputsRequired: "Inputs Requeridos",
    contractIdPlaceholder: "Contract ID de Destino",
    btnGenerateProof: "Generar Prueba Criptográfica →",
    
    // ZK Loader
    zkProgressTitle: "Computación ZK en Progreso",
    zkMsg1: "Descargando circuito WASM...",
    zkMsg2: "Construyendo Árbol de Merkle con saldos ocultos...",
    zkMsg3: "Generando Prueba ZK (UltraHonk) - Puede tomar 10~30s...",
    zkMsg4: "Alistando transacción para enviar a Soroban...",
    triviaTitle: "¿Sabías que...?",
    triviaList: [
      "Stellar procesa miles de transacciones por segundo por una fracción de centavo.",
      "Las pruebas Zero-Knowledge te permiten probar una verdad matemática sin revelar los datos subyacentes.",
      "Veraz utiliza UltraHonk, un motor avanzado de criptografía, directamente en tu navegador.",
      "Soroban es la plataforma de smart contracts de Stellar, construida sobre Rust y WebAssembly.",
      "Con Veraz, los clientes pueden auditar a su exchange sin tener que confiar en terceros."
    ],
    
    // Success
    proofAccepted: "Prueba Aceptada",
    proofAcceptedDesc: "La red de Soroban ha verificado y aceptado tu prueba de solvencia.",
    txHashLabel: "Hash de la transacción:",
  }
};
