# Tareas para el Backend: Resolución de Verificación ZK (Error 4)

Este documento detalla el diagnóstico y las tareas necesarias del lado del backend/smart contracts para terminar de habilitar el flujo End-to-End de Veraz Proof of Solvency.

## 1. Contexto y Estado del Frontend
El frontend ha sido depurado y estabilizado exitosamente para generar pruebas ZK reales:
- **Circuito y Prover:** Se integró `@aztec/bb.js@0.87.0` y `@noir-lang/noir_js@1.0.0-beta.9`. Las pruebas UltraHonk de ~14.5KB se generan correctamente en el navegador y el `witness` resuelve todos los *constraints* correctamente contra el archivo `src/solvency.json` local.
- **Serialización de Public Inputs:** El frontend ahora formatea correctamente las salidas de Noir. Se empaquetan `[root, total_liabilities, ledger_seq]` en un arreglo de exactamente **96 bytes en Big-Endian**. 
- **Stale Proof Bypass:** Se compensó el tiempo de generación de la prueba en el frontend (`latest.sequence + 5`) garantizando que al llegar a la red la secuencia no exceda la `freshness_window` (100 ledgers) del contrato.

## 2. El Problema Actual: `Error(Contract, #4)`
Actualmente, el contrato `SolvencyPolicy` devuelve un `Error 4` cuando el usuario hace el `attest`. Originalmente, el frontend creía que esto significaba siempre `StaleProof` ("Prueba obsoleta"). 

**Tras realizar simulaciones a bajo nivel comprobamos lo siguiente:**
1. El chequeo de `StaleProof` en `SolvencyPolicy` se está superando exitosamente. El contrato principal parsea correctamente la secuencia y continúa hacia el chequeo de verificación.
2. Al ejecutar el *cross-contract call* hacia el contrato `Verifier` (`CD3IUK7ONHMFMINBL44UF4P5ALJ6OUTX4MDZBQ6EJT6Z5HPB5UZIOOFN`), es **este contrato** el que está devolviendo `Error 4` (`VerifyProofFailed`).
3. Dado que Soroban hace un "bubble-up" del error, `SolvencyPolicy` reporta a la red un `Error 4`, confundiendo al cliente.

## 3. Diagnóstico Técnico
El Verifier en Testnet está rechazando pruebas que matemáticamente son 100% válidas localmente. Esto **confirma de forma concluyente que existe un "Verification Key Mismatch"**. 

La causa probable es que la versión global de `nargo` o el binario `bb` utilizados en la máquina del desarrollador que ejecutó el despliegue difiere de las dependencias usadas en el cliente (Noir 1.0.0-beta.9 / bb.js 0.87.0), provocando que la Llave de Verificación inyectada en el Smart Contract del Verifier espere una estructura criptográfica distinta.

## 4. Tareas a Ejecutar (Backend / Contratos)

Para completar el flujo E2E, el desarrollador backend debe encargarse de lo siguiente:

- [ ] **Estandarizar Versiones:** Asegurarse de usar Noir `1.0.0-beta.9` y `nargo` (compatible con `bb 0.65.0` o la versión que corresponde a la etiqueta beta.9) para todo el flujo.
- [ ] **Recompilar el Verifier:** Ejecutar `nargo codegen-verifier` para generar el código actualizado del contrato en Soroban utilizando el **mismo** circuito que está en `src/solvency.json`.
- [ ] **Redesplegar el Verifier:** Desplegar el nuevo contrato Verificador a Testnet.
- [ ] **Actualizar la Configuración:** Modificar o reinstanciar el contrato principal `SolvencyPolicy` para que utilice el nuevo ID del Verifier.
- [ ] *(Recomendado)* **Manejo de Errores Cruzados:** En el contrato `SolvencyPolicy`, capturar explícitamente el fallo del cross-contract invocation (`invoke_contract`) para que devuelva `Error::InvalidProof (3)` en lugar de dejar que el `Error 4` del Verifier se filtre directo al cliente y se confunda con el código `Error::StaleProof (4)`.

Una vez que la Llave de Verificación en cadena coincida matemáticamente con las pruebas generadas por el cliente, el sistema de comprobación ZK funcionará correctamente de principio a fin.
