CREATE TABLE IF NOT EXISTS transactions (
    block_hash TEXT,
    block_number BIGINT,
    from_address TEXT,
    to_address TEXT,
    gas BIGINT,
    gas_price BIGINT,
    hash TEXT,
    input TEXT,
    nonce BIGINT,
    transaction_index BIGINT,
    value DECIMAL(38,0),
    /* Receipt */
    cumulative_gas_used BIGINT,
    gas_used BIGINT,
    contract_address TEXT,
    status BOOLEAN,
    CONSTRAINT unique_transaction UNIQUE(hash)
)
