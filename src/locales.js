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
    
    // Landing Info Sections
    infoAccordionTitle: "Learn More",
    infoWhyStellarTitle: "Why Multi-Source Reserve Verification?",
    infoWhyStellarDesc: "Modern stablecoin issuers don't hold all reserves in one wallet. They provide liquidity to DEXs like Aquarius (30-40% of reserves typically). Veraz is the ONLY system that reads reserves from BOTH SAC wallets AND Aquarius pool shares, then verifies solvency with Zero-Knowledge privacy. Traditional solutions miss pool reserves and report false insolvency.",
    infoHowItWorksTitle: "How it Works",
    infoHowItWorksDesc: "1. Issuer enters private holder balances (liabilities) locally.\n2. UltraHonk generates Zero-Knowledge proof in browser (data never leaves).\n3. Smart contract reads reserves from SAC wallet + Aquarius pools via cross-contract calls.\n4. ZK proof verified on-chain: reserves ≥ liabilities.\n5. Public attestation created - balances stay hidden, solvency proven.",
    
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

    // Tour Strings
    tourNext: "Next",
    tourPrev: "Previous",
    tourDone: "Got it!",
    tourLandingAuditorTitle: "Audit a Platform",
    tourLandingAuditorDesc: "Click here if you are a user and want to cryptographically verify that an exchange has the funds to cover its liabilities.",
    tourLandingIssuerTitle: "Prove Your Solvency",
    tourLandingIssuerDesc: "Click here if you are an exchange and want to generate a mathematical proof of your reserves without exposing client data.",
    tourAuditorSearchTitle: "Enter Contract ID",
    tourAuditorSearchDesc: "Paste the Soroban smart contract ID of the issuer here to verify their cryptographic proof on-chain.",
    tourIssuerWalletTitle: "Connect Identity",
    tourIssuerWalletDesc: "First, you must connect your Freighter wallet to sign the transaction that will publish the proof on Soroban.",
    tourIssuerInputsTitle: "Private Liabilities",
    tourIssuerInputsDesc: "Enter exactly 8 balances. These will be mathematically hidden (hashed) so no one can see them, but the total sum will be verified against the reserves.",
    tourHelpBtn: "Interactive Help",

    // Accessibility (A11y) ARIA Labels
    ariaLangToggle: "Toggle language between English and Spanish",
    ariaSearchInput: "Search input for the issuer's contract ID",
    ariaBalancesInput: "Text area to input the 8 client balances separated by commas",
    ariaHelpBtn: "Start interactive guided tour for this screen"
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
    
    // Landing Info Sections
    infoAccordionTitle: "Aprender Más",
    infoWhyStellarTitle: "¿Por qué Verificación Multi-Fuente?",
    infoWhyStellarDesc: "Los emisores modernos de stablecoins no guardan todas las reservas en una wallet. Proveen liquidez a DEXs como Aquarius (30-40% de reservas típicamente). Veraz es el ÚNICO sistema que lee reservas desde wallets SAC Y pool shares de Aquarius, verificando solvencia con privacidad Zero-Knowledge. Soluciones tradicionales ignoran pools y reportan falsa insolvencia.",
    infoHowItWorksTitle: "Cómo funciona",
    infoHowItWorksDesc: "1. Emisor ingresa balances privados de titulares (pasivos) localmente.\n2. UltraHonk genera prueba Zero-Knowledge en navegador (datos nunca salen).\n3. Contrato lee reservas desde wallet SAC + pools Aquarius via cross-contract calls.\n4. Prueba ZK verificada on-chain: reservas ≥ pasivos.\n5. Atestación pública creada - balances ocultos, solvencia probada.",
    
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

    // Tour Strings
    tourNext: "Siguiente",
    tourPrev: "Anterior",
    tourDone: "¡Entendido!",
    tourLandingAuditorTitle: "Audita una Plataforma",
    tourLandingAuditorDesc: "Haz clic aquí si eres un usuario o entidad que quiere verificar matemáticamente que un exchange tiene reservas suficientes.",
    tourLandingIssuerTitle: "Prueba tu Solvencia",
    tourLandingIssuerDesc: "Haz clic aquí si eres un exchange y quieres probar tus reservas de forma pública sin revelar los balances privados de tus clientes.",
    tourAuditorSearchTitle: "Ingresa el Contract ID",
    tourAuditorSearchDesc: "Pega aquí el ID del contrato inteligente (Soroban) del exchange para leer y verificar su prueba criptográfica en la red.",
    tourIssuerWalletTitle: "Conecta tu Identidad",
    tourIssuerWalletDesc: "Primero necesitas conectar tu billetera de Freighter. Esto servirá para firmar la transacción que publica la prueba ZK en Soroban.",
    tourIssuerInputsTitle: "Pasivos Privados",
    tourIssuerInputsDesc: "Ingresa exactamente los 8 saldos. El circuito ZK los ocultará mediante Hashes criptográficos para que nadie pueda leerlos, pero sumará el total para validar la solvencia.",
    tourHelpBtn: "Ayuda Interactiva",

    // Accessibility (A11y) ARIA Labels
    ariaLangToggle: "Cambiar idioma entre Inglés y Español",
    ariaSearchInput: "Campo de búsqueda para el ID del contrato inteligente",
    ariaBalancesInput: "Área de texto para ingresar los 8 balances de clientes separados por comas",
    ariaHelpBtn: "Iniciar tour interactivo guiado para esta pantalla"
  }
};
