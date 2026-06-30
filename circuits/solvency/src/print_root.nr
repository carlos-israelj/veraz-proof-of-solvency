use dep::std;

global N: u32 = 8;
global TREE: u32 = 2 * N - 1;

fn hash_leaf(balance: Field, salt: Field) -> Field {
    std::hash::pedersen_hash([balance, salt])
}

fn hash_node(lh: Field, ls: Field, rh: Field, rs: Field) -> Field {
    std::hash::pedersen_hash([lh, ls, rh, rs])
}

fn main() -> pub Field {
    let balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000];
    let salts = [1, 2, 3, 4, 5, 6, 7, 8];

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

    node_hash[0]
}
