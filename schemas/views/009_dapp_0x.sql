SELECT timestamp,
transaction_hash,
 (SUBSTRING("data", 25, 40))AS "taker" ,
 SUBSTRING("topic_1", 25, 40) AS maker,
  (SUBSTRING("data", 89, 40))AS "relayer" ,
  hex2dec(SUBSTRING("data", 153, 40))::numeric AS "maker_token_amount" ,
  hex2dec(SUBSTRING("data", 217, 40))::NUMERIC AS "taker_token_amount" ,
  hex2dec(SUBSTRING("data", 153, 40))::NUMERIC AS "maker_fee_amount" ,
  hex2dec(SUBSTRING("data", 217, 40))::NUMERIC AS "taker_fee_amount" ,
  (SUBSTRING("data", 609, 40))AS "maker_token" ,
  (SUBSTRING("data", 801, 40))AS "taker_token"

 FROM events
 WHERE topic_0 = '0bcc4c97732e47d9946f229edb95f5b6323f601300e4690de719993f3c371129' AND address = '4f833a24e1f95d70f028921e27040ca56e09ab0b'
 AND SUBSTRING("data", 577, 8) = 'f47261b0'

  LIMIT 100
