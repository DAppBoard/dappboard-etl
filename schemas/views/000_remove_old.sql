DELETE from blocks WHERE timestamp < CURRENT_DATE - INTERVAL '90 day';
DELETE from events WHERE timestamp < CURRENT_DATE - INTERVAL '90 day';
DELETE from transactions WHERE timestamp < CURRENT_DATE - INTERVAL '90 day';
DELETE from token_transfers WHERE timestamp < CURRENT_DATE - INTERVAL '90 day';
