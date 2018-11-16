/*
 **
 **
 */

var Web3 = require('web3');

enum_providerType = {
  WS: 1,
  HTTP: 2,
  S3: 3
};

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
    var res = (logTopic.substring(26).toLowerCase());
    if (res == '0000000000000000000000000000000000000000') {
      return (null);
    }
    return (res);
  }
  return (null);
}

Provider.prototype.logDataToAddress = function(logData, position) {
  var res = (this.normalizeHash(logData).substring((64 * position) + 24, (64 * position) + 64));
  if (res == '0000000000000000000000000000000000000000') {
    return (null);
  }
  return (res);
}

Provider.prototype.getFuncSig(data) {
  var data = this.normalizeHash(data);
  if (data != null) {
    return (data.substring(0,8));
  } else {
    return(null);
  }
}

Provider.prototype.normalizeHash = function(hash) {
  if (hash != null && hash.startsWith("0x")) {
    var res = hash.slice(2).toLowerCase());
    if (res.length == 0) {
      return (null);
    }
    return (res);
  }
  if (hash != null && hash.length > 0) {
    return (hash);
  }
  return (null);
}

Provider.prototype.getLatestBlock = async function() {
  var latestBlock = await this.w3.eth.getBlockNumber();
  return (latestBlock);
}

module.exports.Provider = Provider;
module.exports.ProviderType = enum_providerType;
