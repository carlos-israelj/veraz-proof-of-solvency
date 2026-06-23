// Proof of Solvency — circuito de pasivos (Merkle-sum-tree)
//
// Prueba, SIN revelar los saldos individuales, que:
//   1. cada saldo de tenedor es no-negativo y acotado (range check) -> defensa anti dummy-user attack
//   2. el árbol de sumas está bien formado (la suma de cada nodo = suma de sus hijos)
//   3. la raíz `root` compromete el conjunto y su suma total es `total_liabilities` (L)
//
// `ledger_seq` se expone como input público para atar la prueba a un snapshot concreto;
// su semántica de frescura / anti-replay la impone el contrato Soroban (Capa 2).
//
// El contrato (off-circuit) comprueba R >= L leyendo las reservas en vivo del ledger.
//
// NOTA: no se pudo compilar con `nargo` en este entorno. Antes de usar:
//   - verificar la API `assert_max_bit_size` contra la versión de Noir fijada
//   - ajustar el tag de la dependencia `poseidon` en Nargo.toml
//   - correr `nargo compile` / `nargo execute`

use dep::poseidon::poseidon2::Poseidon2;

global N: u32 = 8;            // nº de tenedores (potencia de 2). Subir para escalar (8 -> demo).
global TREE: u32 = 2 * N - 1; // nodos del árbol heap-indexado
global MAX_BITS: u32 = 120;   // cota superior de cada saldo (cabe en el i128 del contrato)

// Compromiso de hoja: oculta el saldo tras una sal.
fn hash_leaf(balance: Field, salt: Field) -> Field {
    Poseidon2::hash([balance, salt], 2)
}

// Nodo interno: enlaza los hashes de los hijos y sus sumas.
fn hash_node(lh: Field, ls: Field, rh: Field, rs: Field) -> Field {
    Poseidon2::hash([lh, ls, rh, rs], 4)
}

fn main(
    // --- inputs públicos (parte del enunciado de la prueba) ---
    root: pub Field,
    total_liabilities: pub Field,
    ledger_seq: pub Field,
    // --- inputs privados (nunca salen del prover) ---
    balances: [Field; N],
    salts: [Field; N],
) {
    // Árbol heap-indexado: hojas en [N-1 .. 2N-2], internos en [0 .. N-2].
    let mut node_hash: [Field; TREE] = [0; TREE];
    let mut node_sum: [Field; TREE] = [0; TREE];

    // Hojas: range check de no-negatividad + compromiso.
    for i in 0..N {
        balances[i].assert_max_bit_size::<MAX_BITS>(); // 0 <= balance < 2^MAX_BITS
        let idx = N - 1 + i;
        node_hash[idx] = hash_leaf(balances[i], salts[i]);
        node_sum[idx] = balances[i];
    }

    // Nodos internos, de abajo hacia arriba (recorrido en reversa con bound constante).
    for k in 0..(N - 1) {
        let i = (N - 2) - k;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        node_sum[i] = node_sum[l] + node_sum[r];
        node_hash[i] = hash_node(node_hash[l], node_sum[l], node_hash[r], node_sum[r]);
    }

    // Enlazar el cómputo con los inputs públicos.
    assert(node_hash[0] == root);
    assert(node_sum[0] == total_liabilities);

    // `ledger_seq` queda como input público para atar la prueba al snapshot.
    let _ = ledger_seq;
}

#[test]
fn test_well_formed_tree_sums() {
    // Saldos de ejemplo (8 tenedores). La suma es 400000.
    let balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000];
    let salts = [1, 2, 3, 4, 5, 6, 7, 8];

    // Recalcular la raíz con la misma lógica para el test.
    let mut node_hash: [Field; TREE] = [0; TREE];
    let mut node_sum: [Field; TREE] = [0; TREE];
    for i in 0..N {
        let idx = N - 1 + i;
        node_hash[idx] = hash_leaf(balances[i], salts[i]);
        node_sum[idx] = balances[i];
    }
    for k in 0..(N - 1) {
        let i = (N - 2) - k;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        node_sum[i] = node_sum[l] + node_sum[r];
        node_hash[i] = hash_node(node_hash[l], node_sum[l], node_hash[r], node_sum[r]);
    }

    main(node_hash[0], 400000, 58204113, balances, salts);
}
