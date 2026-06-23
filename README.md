# Veraz — Frontend

Dos pantallas para el proof of solvency:

- **Público:** consulta el badge de un emisor (lectura por simulación, sin firmar).
- **Emisor:** genera la prueba de pasivos y la publica on-chain (firma con Freighter).

## Requisitos
- Node 20+
- Extensión [Freighter](https://freighter.app) en testnet (para la pantalla de Emisor)

## Correr
```bash
npm install
npm run dev
```

## Estado actual (honesto)
- La integración con Stellar (`src/lib/stellar.js`) es **real**: `querySolvent` simula `is_solvent`
  y `attest` firma+envía con Freighter, siguiendo los patrones de la skill `dapp`.
- El proving (`src/lib/prover.js`) está en **MOCK = true** para iterar la UI. Para pruebas reales:
  1. `cd ../circuits/solvency && nargo compile` → genera `target/solvency.json`
  2. `npm i @noir-lang/noir_js @aztec/bb.js`
  3. copiar el `.json` compilado y poner `MOCK = false` (ver bloque comentado).

## Loop de demo (testnet)
1. Emitir el token de prueba USDX y repartirlo a cuentas-tenedor (ver `../scripts`).
2. Fondear las cuentas de reserva del emisor con USDC/XLM de testnet.
3. Desplegar verifier (Capa 1) y solvency_policy (Capa 2/3) con su `__constructor`.
4. Pantalla **Emisor** → conectar Freighter → pegar Contract ID → generar prueba y atestar.
5. Pantalla **Público** → pegar Contract ID → ver "Solvente".
6. Bajar la reserva por debajo de los pasivos, re-atestar, y mostrar "Insolvente":
   esa es la demostración de que el ZK es load-bearing, no decorativo.
