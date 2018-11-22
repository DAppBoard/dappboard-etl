const rp = require('request-promise');
const cheerio = require('cheerio');

const verifiedContractListURL = 'https://etherscan.io/contractsVerified/';
const getJsonABIURL = "https://api.etherscan.io/api?module=contract&action=getabi&address="
async function  getABIFromEtherscan(address) {
  console.log(getJsonABIURL + address)
//  var getResult = await rp(getJsonABIURL + address)
  //console.log(getResult)
  return (address)
}



async function scrapeVerifiedContracts() {
  var html = await rp(verifiedContractListURL);
  var $ = cheerio.load(html);
  $('.address-tag').each(async function(i, elm) {
    abi = await getABIFromEtherscan($(this).text());
    console.log(abi);
  });
}

scrapeVerifiedContracts()
