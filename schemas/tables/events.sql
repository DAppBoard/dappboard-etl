CREATE TABLE IF NOT EXISTS events (
    block_hash TEXT,
    block_number BIGINT,
    data TEXT,
    log_index BIGINT,
    topic_0 TEXT,
    topic_1 TEXT,
    topic_2 TEXT,
    topic_3 TEXT,
    transaction_hash TEXT,
    transaction_index BIGINT,
    address TEXT,
    CONSTRAINT unique_eventk UNIQUE(transaction_hash, log_index)
)
