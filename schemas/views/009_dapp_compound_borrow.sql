CREATE VIEW dapp_compound_borrow AS
SELECT timestamp,
block_number,
transaction_hash,
(SUBSTRING("data", 25, 40))AS "account",
(SUBSTRING("data", 89, 40))AS "asset",
hex2dec(SUBSTRING("data", 153, 40))::numeric AS "amount",
hex2dec(SUBSTRING("data", 217, 40))::numeric AS "balance_before",
hex2dec(SUBSTRING("data", 281, 40))::numeric AS "balance_after"
FROM events
WHERE topic_0 = '6b69190ebbb96f162b04dc222ef96416f9dca9a415b6dd183c79424501113e18' AND address = '3fda67f7583380e67ef93072294a7fac882fd7e7'
UNION
SELECT timestamp,
block_number,
transaction_hash,
(SUBSTRING("data", 25, 40))AS "account",
(SUBSTRING("data", 89, 40))AS "asset",
0 - hex2dec(SUBSTRING("data", 153, 40))::numeric AS "amount",
hex2dec(SUBSTRING("data", 217, 40))::numeric AS "balance_before",
hex2dec(SUBSTRING("data", 281, 40))::numeric AS "balance_after"
FROM events
WHERE topic_0 = '550e7e464126359c6adc43831f011682856b177df6c49c0af6675dd2a063649d' AND address = '3fda67f7583380e67ef93072294a7fac882fd7e7'

ORDER BY timestamp DESC
