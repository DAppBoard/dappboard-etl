/*
 ** This tool tries to get as much as possible info from a token address
 */

const AbiFunctions = require('abi-decode-functions')

function TokenScrapper(provider, database) {
  this.provider = provider;
  this.database = database;

  this.tokenABI = [{
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{
        "name": "",
        "type": "uint8"
      }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
}

TokenScrapper.prototype.arrayContainsFunction = function(array, funcsig) {
  return (array.indexOf(this.provider.w3.utils.sha3(funcsig).substring(0, 10)) > -1)
}

TokenScrapper.prototype.scrape = async function(address) {
  let contract = new this.provider.w3.eth.Contract(this.tokenABI, address)
  var decimals = null;
  var name = null;
  var symbol = null;

  try {
    decimals = await contract.methods.decimals().call();
  } catch (err) {
  }
  try {
    name = await contract.methods.name().call();
  } catch (err) {
  }
  try {
    await contract.methods.symbol().call();
  } catch (err) {
  }


  var isERC20 = await contract.methods.symbol().call()

  var bytecode = await this.provider.w3.eth.getCode(address);
  const decoder = new AbiFunctions.default(bytecode)
  const functionIds = decoder.getFunctionIds();
  isERC20 = (this.arrayContainsFunction(functionIds, 'totalSupply()') &&
    this.arrayContainsFunction(functionIds, 'balanceOf(address)') &&
    this.arrayContainsFunction(functionIds, 'transfer(address,uint256)') &&
    this.arrayContainsFunction(functionIds, 'transferFrom(address,address,uint256)') &&
    this.arrayContainsFunction(functionIds, 'approve(address,uint256)') &&
    this.arrayContainsFunction(functionIds, 'allowance(address,address)'));
  isERC721 = (this.arrayContainsFunction(functionIds, 'balanceOf(address)') &&
    this.arrayContainsFunction(functionIds, 'ownerOf(uint256)') &&
    (this.arrayContainsFunction(functionIds, 'transfer(address,uint256)') || this.arrayContainsFunction(functionIds, 'transferFrom(address,address,uint256)')) &&
    this.arrayContainsFunction(functionIds, 'approve(address,uint256)'));

  console.log(isERC20, isERC721)


}

module.exports = TokenScrapper;
