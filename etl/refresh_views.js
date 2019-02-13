var Ethereum = require('./ethereum');
var Writer = require('./writers/psql');
var TokenScrapper = require('./utils/token_scraper');

writer = new Writer({
  user: process.env.DAPPBOARD_PSQL_USER,
  host: process.env.DAPPBOARD_PSQL_HOST,
  database: process.env.DAPPBOARD_PSQL_DB,
  password: process.env.DAPPBOARD_PSQL_PASSWORD,
  port: 25061,
  ssl: true,
});

var eth = new Ethereum.Provider(Ethereum.ProviderType.WS, process.env.DAPPBOARD_NODE_URL);
var scraper = new TokenScrapper(eth, writer);

var refreshViews = async function(eth, writer) {
  // We query all token addresses that are not in the token table
  var query = `
    REFRESH MATERIALIZED VIEW CONCURRENTLY token_transfers_daily ;
    REFRESH MATERIALIZED VIEW CONCURRENTLY token_transfers_summary ;
  `;
  var missingContracts = await writer.executeAsync(query);

/*  setTimeout(function() {
      scrapMissingTokens(eth, writer);
    },
    40000)*/
}

refreshViews(eth, writer);
