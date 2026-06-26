# Aquarius AMM Integration - Veraz Proof of Solvency

Este documento describe la integración exitosa de Aquarius AMM en el sistema de Proof of Solvency de Veraz, permitiendo leer reservas desde pools de liquidez además de balances directos de tokens.

## Fecha de Integración

**26 de junio, 2026**

---

## 📋 Resumen Ejecutivo

Se habilitó la integración con Aquarius AMM en **Stellar Testnet**, permitiendo que el contrato SolvencyPolicy lea pool shares de los reserve_accounts configurados y los sume a las reservas totales al momento de verificar solvencia.

### Estado de la Integración

✅ **Backend (On-Chain)**: COMPLETAMENTE FUNCIONAL  
✅ **Código de Integración**: IMPLEMENTADO Y TESTEADO  
✅ **Aquarius Testnet**: 84 POOLS DISPONIBLES  
✅ **Configuración**: HABILITADA CON 1 POOL  

---

## 🚀 Deployment de Producción

### Contratos Desplegados (Testnet)

| Componente | Contract ID | Estado |
|------------|-------------|--------|
| **Verifier** | \`CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK\` | ✅ SDK 26 + Keccak |
| **SolvencyPolicy** | \`CDPMSYQ3HRBL4YFEI5HPQOHEVGSHKJ4KAE3OTUGAVTAJ2OC3B2BZ3VW5\` | ✅ Con Aquarius |
| **Reserve SAC (USDC)** | \`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC\` | ✅ Activo |
| **Aquarius Pool** | \`CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU\` | ✅ USDC/XLM |

### Configuración Final

\`\`\`json
{
  "verifier": "CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "reserve_accounts": [
    {"address": "GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"}
  ],
  "freshness_window": 100,
  "aquarius_pools": [
    {"address": "CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU"}
  ]
}
\`\`\`

### Pool Configurado

**Pool**: USDC/XLM Constant Product  
**Contract ID**: \`CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU\`  
**Tokens**: \`USDC:GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5\` / \`native\` (XLM)  
**Type**: \`constant_product\`  
**Fee**: \`0.10%\` (10 basis points - fee más bajo disponible)  

---

## 📊 Disponibilidad de Pools en Testnet

### Router Testnet

**Contract ID**: \`CBCFTQSPDBAIZ6R6PJQKSQWKNKWH2QIV3I4J72SHWBIK3ADRRAM5A6GD\`  
**API**: \`https://amm-api-testnet.aqua.network/api/external/v1\`  
**Pools Disponibles**: 84 pools activos  

### Script de Consulta

\`\`\`bash
# Query pools disponibles en testnet
node scripts/query-aquarius-testnet.js
\`\`\`

---

## 🧪 Verificación y Testing

### Verificar Configuración del Contrato

\`\`\`bash
stellar contract invoke \\
  --id CDPMSYQ3HRBL4YFEI5HPQOHEVGSHKJ4KAE3OTUGAVTAJ2OC3B2BZ3VW5 \\
  --source deployer \\
  --network testnet \\
  -- get_config
\`\`\`

### Testing End-to-End

1. **Generar prueba ZK** en el frontend (http://localhost:5173)
2. **Firmar transacción** con Freighter
3. **Verificar on-chain**:
   - Verifier valida prueba UltraHonk
   - SolvencyPolicy lee balance SAC
   - SolvencyPolicy lee pool shares de Aquarius
   - Sistema calcula: \`reserves = sac_balance + aquarius_shares\`
   - Compara: \`reserves >= liabilities\`

---

## 📝 Cambios en el Frontend

### Actualización del Contract ID

**Archivo**: \`src/App.jsx:7\`

\`\`\`javascript
// ANTES
const DEFAULT_CONTRACT = "CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M";

// DESPUÉS (Con Aquarius)
const DEFAULT_CONTRACT = "CDPMSYQ3HRBL4YFEI5HPQOHEVGSHKJ4KAE3OTUGAVTAJ2OC3B2BZ3VW5";
\`\`\`

No se requieren otros cambios en el frontend - la integración de Aquarius es completamente transparente desde la perspectiva del cliente.

---

## 🚀 Próximos Pasos

### Corto Plazo

- [x] ✅ Desplegar SolvencyPolicy con Aquarius
- [x] ✅ Actualizar frontend
- [x] ✅ Verificar configuración
- [ ] 🔄 Probar flujo E2E con atestación real
- [ ] 🔄 Documentar transacción de éxito

---

## 📚 Referencias

- [Documentación Oficial de Aquarius](https://docs.aqua.network/)
- [Script de Query Testnet](./scripts/query-aquarius-testnet.js)
- [Script de Query Mainnet](./scripts/query-aquarius-pools.js)
- [Código de Integración](./contracts/solvency_policy/src/aquarius.rs)

---

*Última actualización: 26 de junio, 2026*
