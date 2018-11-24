var Ethereum = require('./ethereum');
var Writer = require('./writers/psql');

const rp = require('request-promise');
const cheerio = require('cheerio');

writer = new Writer({
  user: process.env.DAPPBOARD_PSQL_USER,
  host: process.env.DAPPBOARD_PSQL_HOST,
  database: process.env.DAPPBOARD_PSQL_DB,
  password: process.env.DAPPBOARD_PSQL_PASSWORD,
  port: 25060,
  ssl: true,
});

//console.log(process.env.DAPPBOARD_NODE_URL)
var eth = new Ethereum.Provider(Ethereum.ProviderType.WS, process.env.DAPPBOARD_NODE_URL);

const verifiedContractListURL = 'https://etherscan.io/contractsVerified/';
const getJsonABIURL = "https://api.etherscan.io/api?module=contract&action=getabi&address="

async function  getABIFromEtherscan(address) {
  console.log(getJsonABIURL + address)
  var abi = [];
  try {
    var getResult = await rp(getJsonABIURL + address);
    abi = JSON.parse(getResult).result;
  } catch (error) {

  }
  //console.log(getResult)
  return (abi)
}



async function scrapeVerifiedContracts() {
  for (var i = 0; i >= 0; i++) {
    console.log("Current Page", i)
    var html = await rp(verifiedContractListURL + i);
    var $ = cheerio.load(html);
    var tags = $('.address-tag').toArray();
    for (tag of tags) {
      var address = $(tag).text();
      var abi = [];
      try {
        abi = JSON.parse(await getABIFromEtherscan(address));
      } catch (error) {

      }
      for (abiElem of abi) {
        if (abiElem.type == "event") {
          var topic_0 = eth.w3.eth.abi.encodeEventSignature(abiElem);
          var event = {
            topic: eth.normalizeHash(topic_0),
            address: eth.normalizeHash(address),
            name: abiElem.name,
            parameters: JSON.stringify(abiElem.inputs),
          }
          console.log(event)
          writer.insert('meta_events', event);
        }
      }
    }  }


}

scrapeVerifiedContracts()
