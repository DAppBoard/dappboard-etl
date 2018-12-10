function TokenProcessor(writer) {
  this.name = "Token processor";
  this.version = 1;
  this.writer = writer;
  this.type = "token_transfers";
}

TokenProcessor.prototype.process = function(provider, block) {

  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    if (tx.logs != null) {
      for (var j = 0; j < tx.logs.length; j++) {
        var ev = tx.logs[j];
        // We check if the event is an ERC20 token transfer
        if (ev.topics[0] != null && ev.topics[0].toLowerCase() == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
          var obj = {
            token_address: provider.normalizeHash(ev.address),
            transaction_hash: provider.normalizeHash(ev.transactionHash),
            log_index: ev.logIndex,
            timestamp: (new Date(block.timestamp * 1000)).toUTCString(),
            block_number: ev.blockNumber,
          };
          var dataRead = 0;
          if (ev.topics.length > 1) {
            obj.from_address = provider.logTopicToAddress(ev.topics[1]);
          } else {
            obj.from_address = provider.logDataToAddress(ev.data, dataRead++);
          }
          if (ev.topics.length > 2) {
            obj.to_address = provider.logTopicToAddress(ev.topics[2]);
          } else {
            obj.to_address = provider.logDataToAddress(ev.data, dataRead++);
          }
          if (ev.topics.length > 3) {
            obj.value = provider.w3.utils.hexToNumberString(provider.logTopicToAddress(ev.topics[3]));
          } else {
            obj.value = provider.w3.utils.hexToNumberString(provider.logDataToAddress(ev.data, dataRead++));
          }
          this.writer.insert(this.type, obj);
        }
      }
    }
  }
}

module.exports = TokenProcessor;
