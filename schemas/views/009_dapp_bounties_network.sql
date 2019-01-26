SELECT * FROM dapp_bounties_network AS
SELECT
transaction_hash,
timestamp,
name AS "type",
hex2dec(SUBSTRING("data", 1, 64))::NUMERIC AS "bounty_id",
hex2dec(SUBSTRING("data", 65, 64))::NUMERIC / 10^18 AS "param_1_numeric",
SUBSTRING("data", 89, 40) AS "param_1_address",
 SUBSTRING("topic_1", 25, 40) AS topic_1,
 hex2dec(COALESCE(SUBSTRING("topic_2", 25, 40),'0'))::NUMERIC AS fullfilment


FROM "public"."events", meta_events
WHERE "public"."events"."address" =  '2af47a65da8cd66729b4209c22017d6a5c2d2400' AND topic_0=topic
ORDER BY timestamp DESC
