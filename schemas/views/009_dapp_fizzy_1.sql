CREATE VIEW dapp_fizzy_1 AS

SELECT
   "transaction_hash",
   "block_number",
  "timestamp",
 hex2dec(('00'))AS "status" ,
split_part(encode(decode(SUBSTRING("data", 1, 42), 'hex'), 'escape'), '.', 1) AS "airline",
split_part(encode(decode(SUBSTRING("data", 1, 42), 'hex'), 'escape'), '.', 2) AS "flight_number",
to_timestamp(   SUBSTRING(split_part(encode(decode(SUBSTRING("data", 1, 42), 'hex'), 'escape'), '.', 3), 1, 10)::NUMERIC )::timestamp AS "flight_departure",
hex2dec(SUBSTRING("data", 65, 64))::NUMERIC AS "premium",
 hex2dec((SUBSTRING("data", 129, 64)))::NUMERIC AS "indemnity" ,
  ((SUBSTRING("data", 193, 64)))AS "productId" FROM events
 where address='e083515d1541f2a9fd0ca03f189f5d321c73b872'  AND topic_0 = '740610c472095940dbb97134b5a7c4f27fb03c69bd892fea239850fa66dc5480'

 UNION ALL

 SELECT
    "transaction_hash",
   "block_number",
  "timestamp",
 hex2dec((SUBSTRING("data", 258, 64)))AS "status" ,
split_part(encode(decode(SUBSTRING("data", 65, 42), 'hex'), 'escape'), '.', 1) AS "airline",
split_part(encode(decode(SUBSTRING("data", 65, 42), 'hex'), 'escape'), '.', 2) AS "flight_number",
to_timestamp(   SUBSTRING(split_part(encode(decode(SUBSTRING("data", 65, 42), 'hex'), 'escape'), '.', 3), 1, 10)::NUMERIC )::timestamp AS "flight_departure",
hex2dec(SUBSTRING("data", 129, 64))::NUMERIC AS "premium",
 hex2dec((SUBSTRING("data", 193, 64)))::NUMERIC AS "indemnity" ,
  ((SUBSTRING("data", 1, 64)))AS "productId" FROM events
 where address='e083515d1541f2a9fd0ca03f189f5d321c73b872'  AND topic_0 = '1a6e2df3135fe8e5b7327d8181b265f9d5b7c981402cd1b82faf820f0cc054bd'

 ORDER BY "timestamp" DESC
