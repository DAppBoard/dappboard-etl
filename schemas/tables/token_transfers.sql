CREATE TABLE IF NOT EXISTS token_transfers (
    token_address TEXT,
    from_address TEXT,
    to_address TEXT,
    value DECIMAL(38,0),
    transaction_hash TEXT,
    log_index BIGINT,
    block_number BIGINT,
    timestamp TIMESTAMP,
    CONSTRAINT unique_token_transfer UNIQUE(transaction_hash, log_index)
);

CREATE INDEX tokens_transfers_address ON token_transfers USING btree (token_address);
CREATE INDEX tokens_transfers_from ON token_transfers USING btree (from_address);
CREATE INDEX tokens_transfers_to ON token_transfers USING btree (to_address);
CREATE INDEX tokens_transfers_timestamp ON blocks USING btree (timestamp);
