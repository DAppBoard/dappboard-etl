CREATE MATERIALIZED VIEW token_transfers_daily AS
SELECT date_trunc('day', "timestamp") "day",
 token_address,
 COUNT(*) AS transfers,
 COUNT(DISTINCT(from_address)) AS senders,
 COUNT(DISTINCT(to_address)) AS receivers,
 COUNT(DISTINCT(value)) AS nft_distincts,
 SUM(value) AS erc20_volume,
 AVG(value) AS erc20_average,
 MAX(value) AS erc20_maximum
 FROM token_transfers
 GROUP BY day, token_address ORDER BY "day" DESC  WITH NO DATA;

 CREATE INDEX token_transfers_daily_day ON token_transfers_daily (day);

 REFRESH MATERIALIZED VIEW token_transfers_daily ;
