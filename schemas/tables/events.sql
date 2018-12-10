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
    timestamp TIMESTAMP,
    CONSTRAINT unique_event UNIQUE(transaction_hash, log_index)
);

CREATE INDEX events_topic ON events USING btree (topic_0);
CREATE INDEX events_address ON events USING btree (address);
CREATE INDEX events_timestamp ON blocks USING btree (timestamp);
