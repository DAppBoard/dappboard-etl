CREATE TABLE IF NOT EXISTS tokens (
    address TEXT,
    name TEXT,
    symbol TEXT,
    decimals BIGINT,
    is_erc20 BOOL,
    is_erc721 BOOL,
    CONSTRAINT unique_token UNIQUE(address)
);

CREATE INDEX tokens_address ON tokens USING btree (address);
