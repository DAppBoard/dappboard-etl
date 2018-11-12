CREATE TABLE IF NOT EXISTS nft_transfers (
    nft_address STRING,
    from_address STRING,
    to_address STRING,
    transaction_hash STRING,
    log_index BIGINT,
    block_number BIGINT
)
