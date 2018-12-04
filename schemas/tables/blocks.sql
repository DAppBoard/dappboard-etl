CREATE TABLE IF NOT EXISTS blocks (
    difficulty DECIMAL(38,0),
    extra_data TEXT,
    gas_limit BIGINT,
    gas_used BIGINT,
    hash TEXT,
    logs_bloom TEXT,
    miner TEXT,
    mix_hash TEXT,
    nonce TEXT,
    number BIGINT,
    parent_hash TEXT,
    receipts_root TEXT,
    sha3_uncles TEXT,
    size BIGINT,
    state_root TEXT,
    timestamp TIMESTAMP,
    total_difficulty DECIMAL(38,0),
    transaction_count BIGINT,
    transactions_root TEXT,
    CONSTRAINT unique_block UNIQUE(number)
);

CREATE INDEX blocks_number ON blocks USING btree (number);
CREATE INDEX blocks_timestamp ON blocks USING btree (timestamp);
