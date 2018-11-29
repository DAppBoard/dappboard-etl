var Ethereum = require('./ethereum');
var Writer = require('./writers/psql');
var TokenScrapper = require('./utils/token_scraper');

writer = new Writer({
  user: process.env.DAPPBOARD_PSQL_USER,
  host: process.env.DAPPBOARD_PSQL_HOST,
  database: process.env.DAPPBOARD_PSQL_DB,
  password: process.env.DAPPBOARD_PSQL_PASSWORD,
  port: 25060,
  ssl: true,
});

var eth = new Ethereum.Provider(Ethereum.ProviderType.WS, process.env.DAPPBOARD_NODE_URL);
var scraper = new TokenScrapper(eth, writer);

var scrapMissingTokens = async function(eth, writer)  {
  // We query all token addresses that are not in the token table
  var query = `
  SELECT token_transfers.token_address FROM token_transfers WHERE token_address NOT IN (
      SELECT tokens.address from tokens GROUP BY tokens.address
  ) GROUP BY token_transfers.token_address;
  `;
  var missingContracts = await writer.executeAsync(query);
  for (var i = 0; i < missingContracts.length; i++) {
    var contract = missingContracts[i].token_address;
    scraper.scrape(contract)
  }
}

scrapMissingTokens(eth, writer);
