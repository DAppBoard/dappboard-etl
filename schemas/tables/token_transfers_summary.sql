CREATE MATERIALIZED VIEW token_transfers_summary AS
SELECT address, name, symbol, decimals, is_erc20, is_erc721,
COALESCE(SUM(token_transfers_daily.transfers) FILTER (WHERE "day" > CURRENT_DATE - INTERVAL '1 day'), 0) AS transfers_today,
COALESCE(SUM(token_transfers_daily.receivers) FILTER (WHERE "day" > CURRENT_DATE - INTERVAL '1 day'), 0) AS receivers_today,
COALESCE(SUM(token_transfers_daily.senders) FILTER (WHERE "day" > CURRENT_DATE - INTERVAL '1 day'), 0) AS senders_today,
COALESCE(SUM(token_transfers_daily.transfers), 0) AS transfers,
json_agg(json_build_object('day', day::date, 'volume', erc20_volume, 'transfers', transfers)) AS item
 FROM tokens
 JOIN token_transfers_daily ON address = token_address
   WHERE "day" > NOW() - INTERVAL '7 day'
GROUP BY address, name, symbol, decimals, is_erc20, is_erc721
WITH DATA;

CREATE UNIQUE INDEX token_transfers_token_address ON token_transfers_summary(address);


REFRESH MATERIALIZED VIEW token_transfers_summary;

REFRESH MATERIALIZED VIEW CONCURRENTLY token_transfers_summary;
