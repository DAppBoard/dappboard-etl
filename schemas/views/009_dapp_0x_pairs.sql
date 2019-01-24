CREATE VIEW dapp_0x_pairs AS
SELECT
COUNT(*) as count_of_trades, COUNT(DISTINCT(relayer)) AS count_of_relayers, ftoken.name as fname, stoken.name as sname,  ftoken.symbol as fsym, stoken.symbol as ssym, ftoken.address as faddress, stoken.address as saddress, COUNT(DISTINCT(maker, taker)) AS count_of_traders
 FROM dapp_0x
     LEFT JOIN tokens ftoken ON GREATEST(maker_token, taker_token)=ftoken.address
     LEFT JOIN tokens stoken ON LEAST(maker_token, taker_token)=stoken.address
     WHERE "timestamp" > NOW() - INTERVAL '7 day'
  GROUP BY  ftoken.name, stoken.name, ftoken.symbol, stoken.symbol, ftoken.address, stoken.address ORDER BY count_of_trades DESC
