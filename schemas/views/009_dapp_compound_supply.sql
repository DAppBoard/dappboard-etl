CREATE VIEW dapp_compound_supply AS
 SELECT timestamp,
block_number,
transaction_hash,
(SUBSTRING("data", 25, 40))AS "account",
(SUBSTRING("data", 89, 40))AS "asset",
 hex2dec(SUBSTRING("data", 153, 40))::numeric AS "amount",
 hex2dec(SUBSTRING("data", 217, 40))::numeric AS "balance_before",
 hex2dec(SUBSTRING("data", 281, 40))::numeric AS "balance_after"
 FROM events
 WHERE topic_0 = '4ea5606ff36959d6c1a24f693661d800a98dd80c0fb8469a665d2ec7e8313c21' AND address = '3fda67f7583380e67ef93072294a7fac882fd7e7'
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
 WHERE topic_0 = '56559a17e3aa8ea4b05036eaf31aeaf9fb71fc1b8865b6389647639940bed030' AND address = '3fda67f7583380e67ef93072294a7fac882fd7e7'

ORDER BY timestamp DESC
