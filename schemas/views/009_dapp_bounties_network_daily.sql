CREATE VIEW dapp_bounties_network_daily AS
SELECT CAST("public"."dapp_bounties_network"."timestamp" AS date) AS "day",
 count(CASE WHEN type = 'BountyFulfilled' THEN 1 END) AS "bounty_fullfilled",
  count(CASE WHEN type = 'BountyKilled' THEN 1 END) AS "bounty_killed",
  count(CASE WHEN type = 'BountyActivated' THEN 1 END) AS "bounty_activated",
  count(CASE WHEN type = 'ContributionAdded' THEN 1 END) AS "contribution_added",
  count(CASE WHEN type = 'FulfillmentAccepted' THEN 1 END) AS "fullfilment_accepted"

FROM "public"."dapp_bounties_network"
WHERE CAST("public"."dapp_bounties_network"."timestamp" AS date) BETWEEN CAST((NOW() + INTERVAL '-90 day') AS date)
   AND CAST(now() AS date)
GROUP BY CAST("public"."dapp_bounties_network"."timestamp" AS date)
ORDER BY CAST("public"."dapp_bounties_network"."timestamp" AS date) ASC
