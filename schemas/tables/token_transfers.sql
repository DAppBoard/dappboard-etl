CREATE TABLE IF NOT EXISTS token_transfers (
    token_address TEXT,
    from_address TEXT,
    to_address TEXT,
    value DECIMAL(38,0),
    transaction_hash TEXT,
    log_index BIGINT,
    block_number BIGINT
)
