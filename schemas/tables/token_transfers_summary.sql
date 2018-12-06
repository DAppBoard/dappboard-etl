CREATE MATERIALIZED VIEW token_transfers_summary
AS SELECT "tokens__via__token_address"."address" AS "token_address",
"tokens__via__token_address"."name" AS "name",
"tokens__via__token_address"."symbol" AS "symbol",
"tokens__via__token_address"."decimals" AS "decimals",
"tokens__via__token_address"."is_erc20" AS "is_erc20",
"tokens__via__token_address"."is_erc721" AS "is_erc721",
  COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 day'),0) AS "transfer_count_1d",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 day'),0) AS "receiver_count_1d",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 day'),0) AS "sender_count_1d",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 day') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_1d",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 day'),0) AS "erc721_unique_transferred_1d",

  COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 day'  AND "timestamp" < NOW() - INTERVAL '1 day'),0) AS "transfer_count_1d_previous",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 day'  AND "timestamp" < NOW() - INTERVAL '1 day'),0) AS "receiver_count_1d_previous",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 day'  AND "timestamp" < NOW() - INTERVAL '1 day'),0) AS "sender_count_1d_previous",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 day'  AND "timestamp" < NOW() - INTERVAL '1 day') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_1d_previous",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 day' AND "timestamp" < NOW() - INTERVAL '1 day'),0) AS "erc721_unique_transferred_1d_previous",

    COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '7 day'),0) AS "transfer_count_7d",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '7 day'),0) AS "receiver_count_7d",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '7 day'),0) AS "sender_count_7d",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '7 day') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_7d",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '7 day'),0) AS "erc721_unique_transferred_7d",

  COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '14 day'  AND "timestamp" < NOW() - INTERVAL '7 day'),0) AS "transfer_count_7d_previous",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '14 day'  AND "timestamp" < NOW() - INTERVAL '7 day'),0) AS "receiver_count_7d_previous",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '14 day'  AND "timestamp" < NOW() - INTERVAL '7 day'),0) AS "sender_count_7d_previous",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '14 day'  AND "timestamp" < NOW() - INTERVAL '7 day') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_7d_previous",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '14 day' AND "timestamp" < NOW() - INTERVAL '7 day'),0) AS "erc721_unique_transferred_7d_previous",

    COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 hour'),0) AS "transfer_count_1h",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 hour'),0) AS "receiver_count_1h",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 hour'),0) AS "sender_count_1h",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 hour') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_1h",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '1 hour'),0) AS "erc721_unique_transferred_1h",

  COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 hour'  AND "timestamp" < NOW() - INTERVAL '1 hour'),0) AS "transfer_count_1h_previous",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 hour'  AND "timestamp" < NOW() - INTERVAL '1 hour'),0) AS "receiver_count_1h_previous",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 hour'  AND "timestamp" < NOW() - INTERVAL '1 hour'),0) AS "sender_count_1h_previous",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 hour'  AND "timestamp" < NOW() - INTERVAL '1 hour') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_1h_previous",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '2 hour' AND "timestamp" < NOW() - INTERVAL '1 hour'),0) AS "erc721_unique_transferred_1h_previous",

      COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '12 hour'),0) AS "transfer_count_12h",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '12 hour'),0) AS "receiver_count_12h",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '12 hour'),0) AS "sender_count_12h",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '12 hour') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_12h",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '12 hour'),0) AS "erc721_unique_transferred_12h",

  COALESCE(count(*) FILTER(WHERE "timestamp" > NOW() - INTERVAL '24 hour'  AND "timestamp" < NOW() - INTERVAL '12 hour'),0) AS "transfer_count_12h_previous",
  COALESCE(count(distinct "public"."token_transfers"."to_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '24 hour'  AND "timestamp" < NOW() - INTERVAL '12 hour'),0) AS "receiver_count_12h_previous",
  COALESCE(count(distinct "public"."token_transfers"."from_address") FILTER(WHERE "timestamp" > NOW() - INTERVAL '24 hour'  AND "timestamp" < NOW() - INTERVAL '12 hour'),0) AS "sender_count_12h_previous",
  COALESCE(sum("public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '24 hour'  AND "timestamp" < NOW() - INTERVAL '12 hour') / 10 ^ COALESCE("tokens__via__token_address"."decimals", 0) ,0)  AS "erc20_volume_12h_previous",
  COALESCE(count(distinct "public"."token_transfers"."value") FILTER(WHERE "timestamp" > NOW() - INTERVAL '24 hour' AND "timestamp" < NOW() - INTERVAL '12 hour'),0) AS "erc721_unique_transferred_12h_previous"

FROM "public"."token_transfers"
LEFT JOIN "public"."blocks" "blocks__via__block_number" ON "public"."token_transfers"."block_number" = "blocks__via__block_number"."number" LEFT JOIN "public"."tokens" "tokens__via__token_address" ON "public"."token_transfers"."token_address" = "tokens__via__token_address"."address"
WHERE "blocks__via__block_number"."timestamp" > NOW() - INTERVAL '14 day'
GROUP BY "tokens__via__token_address"."address", "tokens__via__token_address"."name", "tokens__via__token_address"."symbol", "tokens__via__token_address"."decimals", "tokens__via__token_address"."is_erc721", "tokens__via__token_address"."is_erc20"
ORDER BY "transfer_count_1d" DESC, "tokens__via__token_address"."name" ASC
WITH NO DATA;
