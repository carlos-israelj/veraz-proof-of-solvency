# Guía de Deployment: UltraHonk Verifier en Stellar

**Fecha**: 28 de Junio, 2026
**Versión**: 1.0
**Estado**: ✅ Validado en Testnet

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación de Barretenberg](#instalación-de-barretenberg)
3. [Compilación de Circuitos](#compilación-de-circuitos)
4. [Generación de Verification Key](#generación-de-verification-key)
5. [Deployment del Verifier](#deployment-del-verifier)
6. [Generación de Proofs](#generación-de-proofs)
7. [Verificación On-Chain](#verificación-on-chain)
8. [Contratos Deployados](#contratos-deployados)
9. [Troubleshooting](#troubleshooting)
10. [Referencias Rápidas](#referencias-rápidas)

---

## ✅ Requisitos Previos

### Software Necesario

```bash
# Noir (Circuit Compiler)
noir --version
# Expected: nargo version = 1.0.0-beta.9

# Stellar CLI
stellar --version
# Expected: stellar 23.0.0 or later

# Barretenberg (se instala más adelante)
```

### Configuración de Stellar

```bash
# Verificar que tienes una identidad configurada
stellar keys ls

# Si no tienes "alice", crearla:
stellar keys generate alice --network testnet

# Verificar balance (necesitas XLM en testnet)
stellar keys address alice
```

**Importante**: Necesitas XLM en testnet. Obtén desde: https://laboratory.stellar.org/#account-creator

---

## 🔧 Instalación de Barretenberg

### Método Manual (Recomendado)

```bash
# Navegar al directorio del verifier
cd /path/to/contracts/verifier

# Crear directorio para Barretenberg
mkdir -p .bb/bin

# Descargar Barretenberg v0.87.0
curl -L "https://github.com/AztecProtocol/aztec-packages/releases/download/v0.87.0/barretenberg-amd64-linux.tar.gz" -o /tmp/bb.tar.gz

# Extraer
tar -xzf /tmp/bb.tar.gz -C .bb/bin

# Dar permisos de ejecución
chmod +x .bb/bin/bb

# Verificar instalación
.bb/bin/bb --version
# Expected: barretenberg 0.87.0
```

### Alternativa: bbup (puede fallar)

```bash
# Si bbup funciona en tu sistema:
bbup -v 0.87.0
```

**Nota**: Si bbup falla con error de gzip, usa el método manual.

---

## 📝 Compilación de Circuitos

### Estructura de Directorios

```
circuits/
├── simple_circuit/          # Para testing
│   ├── src/main.nr
│   ├── Prover.toml
│   └── target/
└── solvency/               # Producción
    ├── src/main.nr
    ├── Prover.toml
    └── target/
```

### Compilar Simple Circuit (Testing)

```bash
cd circuits/simple_circuit

# Compilar
nargo compile

# Output esperado:
# → target/simple_circuit.json (compilado)
```

### Compilar Solvency Circuit (Producción)

```bash
cd circuits/solvency

# Compilar
nargo compile

# Output esperado:
# → target/solvency.json (~30KB)
```

**Importante**: NO ejecutes `nargo execute` todavía si no tienes un Merkle root válido en `Prover.toml`.

---

## 🔑 Generación de Verification Key

### ⚠️ CRÍTICO: Oracle Hash Keccak

**SIEMPRE** usa `--oracle_hash keccak` para Protocol 26 (CAP-80).

### Simple Circuit VK

```bash
cd circuits/simple_circuit

# Generar VK con Keccak oracle
../../contracts/verifier/.bb/bin/bb write_vk \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/simple_circuit.json \
  --output_path target \
  --output_format bytes_and_fields

# Verificar tamaño (DEBE ser exactamente 1760 bytes)
wc -c target/vk
# Expected: 1760 target/vk
```

### Solvency Circuit VK

```bash
cd circuits/solvency

# Generar VK con Keccak oracle
../../contracts/verifier/.bb/bin/bb write_vk \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/solvency.json \
  --output_path target \
  --output_format bytes_and_fields

# Verificar tamaño
wc -c target/vk
# Expected: 1760 target/vk
```

### Outputs Generados

```
target/
├── vk              # 1760 bytes (binary)
└── vk_fields.json  # VK en formato JSON (para debugging)
```

**IMPORTANTE**:
- ✅ VK debe ser **exactamente 1760 bytes**
- ✅ `--oracle_hash keccak` es **OBLIGATORIO**
- ❌ Si usas Pedersen, el deployment fallará

---

## 🚀 Deployment del Verifier

### Compilar Contrato Verifier

```bash
cd contracts/verifier

# Compilar contrato Soroban
stellar contract build

# Output esperado:
# → target/wasm32v1-none/release/rs_soroban_ultrahonk.wasm (25KB)
```

### Deploy Simple Circuit Verifier (Testing)

```bash
cd contracts/verifier

stellar contract deploy \
  --wasm target/wasm32v1-none/release/rs_soroban_ultrahonk.wasm \
  --source alice \
  --network testnet \
  -- \
  --vk_bytes-file-path circuits/simple_circuit/target/vk
```

**Output esperado**:
```
CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW
✅ Deployed!
```

### Deploy Solvency Circuit Verifier (Producción)

```bash
cd contracts/verifier

stellar contract deploy \
  --wasm target/wasm32v1-none/release/rs_soroban_ultrahonk.wasm \
  --source alice \
  --network testnet \
  -- \
  --vk_bytes-file-path ../../circuits/solvency/target/vk
```

**Output esperado**:
```
CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ
✅ Deployed!
```

### Verificar Deployment

```bash
# Ver el contrato en Stellar Expert
# https://stellar.expert/explorer/testnet/contract/{CONTRACT_ID}

# O en Stellar Lab
# https://lab.stellar.org/r/testnet/contract/{CONTRACT_ID}
```

---

## 🔐 Generación de Proofs

### Importante: Witness Data

Antes de generar un proof, necesitas:
1. **Valores de entrada válidos** en `Prover.toml`
2. **Merkle root calculado** (para solvency circuit)

### Simple Circuit Proof

```bash
cd circuits/simple_circuit

# Ejecutar circuit (genera witness)
nargo execute

# Output esperado:
# → target/simple_circuit.gz (witness comprimido)

# Generar proof con Keccak oracle
../../contracts/verifier/.bb/bin/bb prove \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/simple_circuit.json \
  --witness_path target/simple_circuit.gz \
  --output_path target \
  --output_format bytes_and_fields
```

**Outputs generados**:
```
target/
├── proof                      # 14,592 bytes (456 fields × 32 bytes)
├── proof_fields.json          # Proof en formato JSON
├── public_inputs              # 32 bytes (para simple_circuit)
└── public_inputs_fields.json  # Public inputs en JSON
```

### Solvency Circuit Proof

**⚠️ REQUISITO**: Debes calcular el Merkle root correcto primero.

```bash
cd circuits/solvency

# 1. PRIMERO: Actualizar Prover.toml con el root correcto
# (Ver sección "Calcular Merkle Root" más abajo)

# 2. Ejecutar circuit
nargo execute

# 3. Generar proof
../../contracts/verifier/.bb/bin/bb prove \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/solvency.json \
  --witness_path target/solvency.gz \
  --output_path target \
  --output_format bytes_and_fields
```

---

## ✅ Verificación On-Chain

### Verificar Simple Circuit Proof

```bash
cd contracts/verifier

stellar contract invoke \
  --id CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW \
  --source alice \
  --network testnet \
  --send=yes \
  -- \
  verify_proof \
  --proof_bytes-file-path circuits/simple_circuit/target/proof \
  --public_inputs-file-path circuits/simple_circuit/target/public_inputs
```

**Output esperado (éxito)**:
```
null
```

**Nota**: `null` significa `Ok()` en Rust. La verificación fue exitosa.

### Verificar Solvency Circuit Proof

```bash
cd contracts/verifier

stellar contract invoke \
  --id CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ \
  --source alice \
  --network testnet \
  --send=yes \
  -- \
  verify_proof \
  --proof_bytes-file-path ../../circuits/solvency/target/proof \
  --public_inputs-file-path ../../circuits/solvency/target/public_inputs
```

**Output esperado (éxito)**:
```
null
```

### Verificar en Stellar Expert

Después de verificar, puedes ver la transacción en:
```
https://stellar.expert/explorer/testnet/tx/{TRANSACTION_HASH}
```

---

## 📦 Contratos Deployados

### Testnet (Actual)

| Circuit | CONTRACT_ID | Uso | Status |
|---------|-------------|-----|--------|
| Simple Circuit | `CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW` | Testing/Demo | ✅ Verificado |
| Solvency Circuit | `CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ` | **Producción** | ✅ Deployed |

### Stellar Expert Links

**Simple Circuit**:
https://stellar.expert/explorer/testnet/contract/CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW

**Solvency Circuit (Producción)**:
https://stellar.expert/explorer/testnet/contract/CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ

---

## 🐛 Troubleshooting

### Error: VK tamaño incorrecto

**Síntoma**:
```
Error(Contract, #1)
```

**Causa**: VK no es exactamente 1760 bytes.

**Solución**:
```bash
# Verificar tamaño
wc -c target/vk

# Si no es 1760, regenerar con --oracle_hash keccak
bb write_vk --scheme ultra_honk --oracle_hash keccak ...
```

### Error: Proof verification failed (#4)

**Síntoma**:
```
Error(Contract, #4)
```

**Causas posibles**:
1. ❌ Proof generado sin `--oracle_hash keccak`
2. ❌ VK y proof usan diferentes oracle hashes
3. ❌ VK no coincide con el circuit
4. ❌ Witness data inválido

**Solución**:
```bash
# 1. Regenerar VK con Keccak
bb write_vk --scheme ultra_honk --oracle_hash keccak ...

# 2. Regenerar proof con Keccak
bb prove --scheme ultra_honk --oracle_hash keccak ...

# 3. Verificar que VK y proof son del mismo circuit
```

### Error: Constraint failed en nargo execute

**Síntoma**:
```
error: Failed constraint
Cannot satisfy constraint
```

**Causa**: Merkle root en `Prover.toml` no coincide con el calculado.

**Solución**:
```bash
# Para solvency circuit, calcula el root correcto
# Ver sección "Calcular Merkle Root" más abajo
```

### Error: bbup installation failed

**Síntoma**:
```
gzip: stdin: not in gzip format
tar: Child returned status 1
```

**Solución**: Usa instalación manual de Barretenberg (ver arriba).

### Error: Directory not found

**Síntoma**:
```bash
cd: cannot access '/path/to/...': No such file or directory
```

**Solución**:
```bash
# Verifica tu ubicación actual
pwd

# Ajusta las rutas relativas según tu estructura
# Usa rutas absolutas si es necesario
cd /mnt/c/Users/.../Veraz/circuits/solvency
```

---

## 📚 Referencias Rápidas

### Comandos Esenciales

```bash
# 1. Compilar circuit
nargo compile

# 2. Generar VK (con Keccak!)
bb write_vk --scheme ultra_honk --oracle_hash keccak \
  --bytecode_path target/circuit.json \
  --output_path target \
  --output_format bytes_and_fields

# 3. Ejecutar circuit (generar witness)
nargo execute

# 4. Generar proof (con Keccak!)
bb prove --scheme ultra_honk --oracle_hash keccak \
  --bytecode_path target/circuit.json \
  --witness_path target/circuit.gz \
  --output_path target \
  --output_format bytes_and_fields

# 5. Deploy verifier
stellar contract deploy \
  --wasm target/wasm32v1-none/release/rs_soroban_ultrahonk.wasm \
  --source alice \
  --network testnet \
  -- \
  --vk_bytes-file-path path/to/vk

# 6. Verificar proof on-chain
stellar contract invoke \
  --id CONTRACT_ID \
  --source alice \
  --network testnet \
  --send=yes \
  -- \
  verify_proof \
  --proof_bytes-file-path path/to/proof \
  --public_inputs-file-path path/to/public_inputs
```

### Tamaños de Archivos Esperados

| Archivo | Tamaño | Notas |
|---------|--------|-------|
| `vk` | 1760 bytes | **Exacto** (no puede variar) |
| `proof` (simple) | 14,592 bytes | 456 fields × 32 bytes |
| `proof` (solvency) | 14,592 bytes | Mismo tamaño |
| `public_inputs` (simple) | 32 bytes | 1 field |
| `public_inputs` (solvency) | 96 bytes | 3 fields (root, liabilities, ledger_seq) |
| `circuit.json` (simple) | ~5 KB | Compilado |
| `circuit.json` (solvency) | ~30 KB | Más complejo |
| `wasm` (verifier) | 25,107 bytes | Constante |

### Flags Importantes

| Flag | Valor | Razón |
|------|-------|-------|
| `--scheme` | `ultra_honk` | Proof system |
| `--oracle_hash` | `keccak` | **OBLIGATORIO para Protocol 26** |
| `--output_format` | `bytes_and_fields` | Genera archivos binarios + JSON |
| `--network` | `testnet` | Red de Stellar |
| `--source` | `alice` | Identidad para firmar |

---

## 🎯 Calcular Merkle Root (Solvency Circuit)

### Problema

El `Prover.toml` del solvency circuit tiene un placeholder:

```toml
root = "0x0000000000000000000000000000000000000000000000000000000000000000"
```

Esto causa que `nargo execute` falle con "Cannot satisfy constraint".

### Solución 1: Usar SDK (Recomendado)

```bash
cd packages/sdk

# Crear script de cálculo
cat > calculate-root.js << 'EOF'
const { MerkleSumTree } = require('./dist/merkle-tree');

const balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000];
const salts = [1, 2, 3, 4, 5, 6, 7, 8];

const tree = new MerkleSumTree(balances, salts);
console.log('Merkle Root:', tree.getRoot());
EOF

# Ejecutar
node calculate-root.js
```

### Solución 2: Usar Python Script

```python
# calculate_root.py
from hashlib import sha256

def pedersen_hash(a, b):
    # Implementación simplificada
    # En producción, usa la misma función que el circuit
    return int.from_bytes(
        sha256(f"{a}{b}".encode()).digest(),
        'big'
    )

balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000]
salts = [1, 2, 3, 4, 5, 6, 7, 8]

# Calcular hashes de hojas
leaves = [pedersen_hash(bal, salt) for bal, salt in zip(balances, salts)]

# Construir árbol (implementación completa necesaria)
# ...

print(f"Root: 0x{root:064x}")
```

### Solución 3: Usar solvency_policy Contract

El contrato `solvency_policy` puede calcular el root por ti:

```bash
# Deploy solvency_policy
stellar contract deploy \
  --wasm contracts/solvency_policy/target/wasm32v1-none/release/solvency_policy.wasm \
  --source alice \
  --network testnet

# Calcular root
stellar contract invoke \
  --id SOLVENCY_POLICY_CONTRACT_ID \
  --source alice \
  --network testnet \
  -- \
  calculate_merkle_root \
  --balances '[100000,50000,25000,75000,30000,20000,60000,40000]' \
  --salts '[1,2,3,4,5,6,7,8]'
```

### Actualizar Prover.toml

Una vez calculado el root:

```toml
# circuits/solvency/Prover.toml
root = "0x1234567890abcdef..."  # Tu root calculado
total_liabilities = "400000"
ledger_seq = "58204113"

balances = ["100000", "50000", "25000", "75000", "30000", "20000", "60000", "40000"]
salts = ["1", "2", "3", "4", "5", "6", "7", "8"]
```

---

## 🔬 Verificación Local (Opcional)

Puedes verificar proofs localmente antes de enviarlos on-chain:

```bash
# Verificar proof localmente
bb verify \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --proof_path target/proof \
  --vk_path target/vk
```

**Output esperado**:
```
✅ Proof verified successfully
```

---

## 📊 Métricas de Performance

### Tiempos Típicos (Testnet)

| Operación | Tiempo | Notas |
|-----------|--------|-------|
| Compilar circuit | < 1 sec | `nargo compile` |
| Generar VK | 3-5 sec | `bb write_vk` |
| Generar witness | < 1 sec | `nargo execute` |
| Generar proof | 3-10 sec | Depende del circuit |
| Deploy contract | 5 sec | Red testnet |
| Verificar on-chain | 2-3 sec | Transaction time |

### Costos (Testnet)

- **Deployment**: ~0.5 XLM (testnet, gratis)
- **Verification**: ~0.0001 XLM por proof
- **Storage**: Incluido en deployment

---

## 🎓 Conceptos Clave

### Protocol 26 CAP-80

- **BN254 Host Functions**: Operaciones de curva elíptica nativas
- **Keccak Oracle**: Transcript hash requerido
- **400M Instruction Limit**: Presupuesto en testnet
- **Por qué importa**: Permite ZK verification on-chain

### UltraHonk Proof System

- **Tipo**: SNARK (Succinct Non-Interactive Argument of Knowledge)
- **Tamaño de proof**: 14,592 bytes (constante)
- **Tamaño de VK**: 1,760 bytes (constante)
- **Curva**: BN254 (Barreto-Naehrig)

### Diferencia: Oracle Hash

| Oracle | Uso | Soporte Protocol 26 |
|--------|-----|---------------------|
| Keccak | Transcript hash | ✅ Sí (host functions) |
| Pedersen | Hash dentro del circuit | ✅ Sí (para circuit logic) |

**Importante**:
- Circuit puede usar Pedersen para Merkle tree
- Proof DEBE usar Keccak para transcript (Protocol 26)

---

## 🚀 Workflow Completo: Zero to Deployed

```bash
# 1. Setup inicial
cd /path/to/veraz
mkdir -p contracts/verifier/.bb/bin

# 2. Instalar Barretenberg
curl -L "https://github.com/AztecProtocol/aztec-packages/releases/download/v0.87.0/barretenberg-amd64-linux.tar.gz" -o /tmp/bb.tar.gz
tar -xzf /tmp/bb.tar.gz -C contracts/verifier/.bb/bin
chmod +x contracts/verifier/.bb/bin/bb

# 3. Compilar circuit
cd circuits/simple_circuit
nargo compile

# 4. Generar VK
../../contracts/verifier/.bb/bin/bb write_vk \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/simple_circuit.json \
  --output_path target \
  --output_format bytes_and_fields

# 5. Verificar VK
wc -c target/vk  # Debe ser 1760

# 6. Compilar verifier contract
cd ../../contracts/verifier
stellar contract build

# 7. Deploy
stellar contract deploy \
  --wasm target/wasm32v1-none/release/rs_soroban_ultrahonk.wasm \
  --source alice \
  --network testnet \
  -- \
  --vk_bytes-file-path ../../circuits/simple_circuit/target/vk

# 8. Guardar CONTRACT_ID
export CONTRACT_ID="CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW"

# 9. Generar proof
cd ../../circuits/simple_circuit
nargo execute
../../contracts/verifier/.bb/bin/bb prove \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/simple_circuit.json \
  --witness_path target/simple_circuit.gz \
  --output_path target \
  --output_format bytes_and_fields

# 10. Verificar on-chain
cd ../../contracts/verifier
stellar contract invoke \
  --id $CONTRACT_ID \
  --source alice \
  --network testnet \
  --send=yes \
  -- \
  verify_proof \
  --proof_bytes-file-path ../../circuits/simple_circuit/target/proof \
  --public_inputs-file-path ../../circuits/simple_circuit/target/public_inputs

# ✅ Success si retorna: null
```

---

## 📝 Checklist de Deployment

Antes de deployar, verifica:

- [ ] Barretenberg v0.87.0 instalado
- [ ] Noir v1.0.0-beta.9 instalado
- [ ] Stellar CLI configurado
- [ ] Identidad "alice" creada
- [ ] XLM en testnet (para gas)
- [ ] Circuit compilado correctamente
- [ ] VK generado con `--oracle_hash keccak`
- [ ] VK es exactamente 1760 bytes
- [ ] WASM compilado (25,107 bytes)
- [ ] Ruta a VK es correcta en comando deploy

Después de deployar:

- [ ] CONTRACT_ID guardado
- [ ] Contrato visible en Stellar Expert
- [ ] VK almacenado en contrato
- [ ] SDK actualizado con CONTRACT_ID

Antes de verificar proof:

- [ ] Witness generado con `nargo execute`
- [ ] Proof generado con `--oracle_hash keccak`
- [ ] Proof es ~14,592 bytes
- [ ] Public inputs generados
- [ ] Rutas a archivos son correctas

---

## 🔗 Links Útiles

### Documentación

- **Noir**: https://noir-lang.org/docs
- **Barretenberg**: https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg
- **Stellar Soroban**: https://soroban.stellar.org/docs
- **Protocol 26 CAP-80**: https://stellar.org/protocol/cap-80

### Herramientas

- **Stellar Expert (Testnet)**: https://stellar.expert/explorer/testnet
- **Stellar Lab**: https://lab.stellar.org
- **Stellar Account Creator**: https://laboratory.stellar.org/#account-creator
- **GitHub Releases (BB)**: https://github.com/AztecProtocol/aztec-packages/releases

### Contratos Veraz

- **Verifier Repo**: https://github.com/AztecProtocol/aztec-packages/tree/master/noir-projects/noir-protocol-circuits/crates/rollup-lib/src
- **Solvency Policy**: `/contracts/solvency_policy`
- **SDK**: `/packages/sdk`

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa la sección [Troubleshooting](#troubleshooting)
2. Verifica que usas `--oracle_hash keccak` en TODOS los comandos
3. Confirma que VK es exactamente 1760 bytes
4. Consulta `KECCAK_SDK26_IMPLEMENTATION.md` para contexto
5. Revisa logs de Stellar Expert para detalles de errores

---

**Última actualización**: 28 de Junio, 2026, 20:15 UTC

**Contratos Deployados**:
- Simple: `CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW`
- Solvency: `CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ`

**Status**: ✅ Ambos verifiers funcionando en testnet
