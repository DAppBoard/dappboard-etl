/*
**
**
*/

// wss://mainnet.infura.io/ws/e4c0c4882ae6458cbd076a23747d4ca7/

var Web3 = require('web3');

enum_providerType = {WS: 1, HTTP: 2, S3: 3};

function Provider(providerType, providerAddress) {
  this.providerAddress = providerAddress;
  this.providerType = providerType;
  this.stats = {
    errors: 0,
    blocks: 0,
    transactionsReceipts: 0,
  };
  if (this.providerType == enum_providerType.WS) {
    this.w3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/d70ece33c9754843b5181a4c07f49a4f/'));
  } else {
  // TODO check other provider types
  //  this.w3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/d70ece33c9754843b5181a4c07f49a4f/'));
  }
}

/*
** Returns a block with all the transactions and their receipts
*/
Provider.prototype.getBlock = async function(blockNumber) {
  var block = await this.w3.eth.getBlock(blockNumber, true);
  // TODO check if null
  for (let i = 0; i < block.transactions.length; i++) {
    var txReceipt = await this.w3.eth.getTransactionReceipt(block.transactions[i].hash);
    //TODO check empty receipt
    block.transactions[i] = Object.assign(block.transactions[i], txReceipt)
  }
  return (block);
}

Provider.prototype.logTopicToAddress = function(logTopic) {
  if (logTopic != null && logTopic.length == 66) {
    return (logTopic.substring(26).toLowerCase());
  }
  return (null);
}

Provider.prototype.normalizeHash = function(hash) {
  if (hash != null && hash.startsWith("0x")) {
    return (hash.slice(2).toLowerCase());
  }
  return (null);
}

module.exports.Provider = Provider;
module.exports.ProviderType = enum_providerType;
