CREATE VIEW dapp_blockimmo AS

SELECT timestamp,
block_number,
transaction_hash,
 (SUBSTRING("data", 25, 40))AS "taker" ,
 data,
  hex2dec(SUBSTRING("data", 25, 40))::numeric / 1000000000000000000 AS "value" ,
    hex2dec(SUBSTRING("data", 90, 40))::numeric / 1000000000000000000 AS "amount" ,

  (SUBSTRING("topic_1", 25, 40)) AS "purchaser" ,
    (SUBSTRING("topic_2", 26, 40)) AS "benficiary"

 FROM events
 WHERE topic_0 = '623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad18' AND address = 'eca5a62c3a7849cc00758b311fd1da98e6994c3d'
 ORDER by timestamp desc
