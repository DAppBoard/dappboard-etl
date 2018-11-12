CREATE TABLE IF NOT EXISTS events (
    log_index BIGINT,
    transaction_hash STRING,
    transaction_index BIGINT,
    block_hash STRING,
    block_number BIGINT,
    address STRING,
    data STRING,
    topics STRING
)
