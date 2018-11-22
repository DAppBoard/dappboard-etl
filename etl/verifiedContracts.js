const rp = require('request-promise');
const cheerio = require('cheerio');

const verifiedContractListURL = 'https://etherscan.io/contractsVerified/';

async function  getABIFromEtherscan(address) {
  var getResult = await rp(url)

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
