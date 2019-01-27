CREATE VIEW dapp_bounties_network_fulfillers AS
SELECT "public"."dapp_bounties_network"."topic_1" AS "address", count(*) AS "count"
FROM "public"."dapp_bounties_network"
WHERE ("public"."dapp_bounties_network"."type" = 'FulfillmentAccepted'
  AND CAST("public"."dapp_bounties_network"."timestamp" AS date) BETWEEN CAST((NOW() + INTERVAL '-90 day') AS date) AND CAST(now() AS date))
GROUP BY "public"."dapp_bounties_network"."topic_1"
ORDER BY "count" DESC
