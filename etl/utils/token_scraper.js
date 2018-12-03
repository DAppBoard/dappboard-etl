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
      "name": "decimal",
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
  } catch (err) {}
  if (decimals == null) {
    try {
      decimals = await contract.methods.decimal().call();
    } catch (err) {}
  }
  try {
    name = await contract.methods.name().call();
  } catch (err) {}
  try {
    symbol = await contract.methods.symbol().call();
  } catch (err) {}

  var bytecode = await this.provider.w3.eth.getCode(address);
  const decoder = new AbiFunctions.default(bytecode)
  const functionIds = decoder.getFunctionIds();
  var isERC20 = (this.arrayContainsFunction(functionIds, 'totalSupply()') &&
    this.arrayContainsFunction(functionIds, 'balanceOf(address)') &&
    this.arrayContainsFunction(functionIds, 'transfer(address,uint256)') &&
    this.arrayContainsFunction(functionIds, 'transferFrom(address,address,uint256)') &&
    this.arrayContainsFunction(functionIds, 'approve(address,uint256)') &&
    this.arrayContainsFunction(functionIds, 'allowance(address,address)') ||
    (name != null && symbol != null && decimals != null));
  var isERC721 = (this.arrayContainsFunction(functionIds, 'balanceOf(address)') &&
    this.arrayContainsFunction(functionIds, 'ownerOf(uint256)') &&
    (this.arrayContainsFunction(functionIds, 'transfer(address,uint256)') || this.arrayContainsFunction(functionIds, 'transferFrom(address,address,uint256)')) &&
    this.arrayContainsFunction(functionIds, 'approve(address,uint256)'));

  var token = {
    name: name,
    decimals: decimals,
    symbol: symbol,
    is_erc20: isERC20,
    is_erc721: isERC721,
    address: address,
  }
  console.log(token)
  this.database.insert('tokens', token);
}

module.exports = TokenScrapper;
