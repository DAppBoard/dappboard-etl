
CREATE MATERIALIZED VIEW token_transfers_daily AS
SELECT date_trunc('day', "timestamp") "day",
 token_address,
 COUNT(*) AS transfers,
 COUNT(DISTINCT(from_address)) AS senders,
 COUNT(DISTINCT(to_address)) AS receivers,
 COUNT(DISTINCT(value)) AS nft_distincts,
 SUM(value / 10 ^ decimals) AS erc20_volume,
 AVG(value / 10 ^ decimals) AS erc20_average,
 MAX(value / 10 ^ decimals) AS erc20_maximum
 FROM token_transfers
 JOIN tokens ON address = token_address
 GROUP BY day, token_address ORDER BY "day" DESC  WITH NO DATA;

 CREATE INDEX token_transfers_token_address ON token_transfers_daily (token_address);

 REFRESH MATERIALIZED VIEW token_transfers_daily ;

 REFRESH MATERIALIZED VIEW CONCURRENTLY token_transfers_daily ;
