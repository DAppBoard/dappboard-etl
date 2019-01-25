CREATE VIEW dapp_0x_daily AS
SELECT CAST("public"."dapp_0x"."timestamp" AS date) AS "day",
  count(*) AS "trades",
 count(distinct( "public"."dapp_0x"."maker_token", "public"."dapp_0x"."taker_token")) AS "pairs",
 count(distinct "public"."dapp_0x"."relayer") AS "relayers"
FROM "public"."dapp_0x"
GROUP BY CAST("public"."dapp_0x"."timestamp" AS date)
ORDER BY CAST("public"."dapp_0x"."timestamp" AS date) ASC
