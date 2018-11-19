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



scraper.scrape("0x5d4abc77b8405ad177d8ac6682d584ecbfd46cec")
scraper.scrape("0x06012c8cf97bead5deae237070f9587f8e7a266d")
scraper.scrape("0x6EbeAf8e8E946F0716E6533A6f2cefc83f60e8Ab")
