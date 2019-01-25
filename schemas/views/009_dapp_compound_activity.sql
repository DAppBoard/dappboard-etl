CREATE VIEW dapp_compound_activity AS
SELECT timestamp,
block_number,
transaction_hash,
"account",
"asset",
"amount" / 10 ^ decimals as amounts,
"balance_before" / 10 ^ decimals as balance_before,
"balance_after" / 10 ^ decimals AS balance_after,
'borrow' AS type,
name,
symbol
decimals
FROM dapp_compound_borrow
INNER JOIN tokens ON (asset=address)
UNION
 SELECT timestamp,
block_number,
transaction_hash,
"account",
"asset",
"amount" / 10 ^ decimals as amounts,
"balance_before" / 10 ^ decimals as balance_before,
"balance_after" / 10 ^ decimals AS balance_after,
'supply' AS type,
name,
symbol
decimals
FROM dapp_compound_supply
INNER JOIN tokens ON (asset=address)


ORDER BY timestamp DESC
