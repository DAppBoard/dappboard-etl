CREATE TABLE IF NOT EXISTS transactions (
    hash STRING,
    nonce BIGINT,
    block_hash STRING,
    block_number BIGINT,
    transaction_index BIGINT,
    from_address STRING,
    to_address STRING,
    value DECIMAL(38,0),
    gas BIGINT,
    gas_price BIGINT,
    input STRING,
    transaction_index BIGINT,
    /* Receipt */
    cumulative_gas_used BIGINT,
    gas_used BIGINT,
    contract_address STRING,
    root STRING,
    status BIGINT
)
