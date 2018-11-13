function TokenProcessor(writer) {
  this.name = "Token processor";
  this.version = 1;
  this.writer = writer;
  this.type = "events";
}

TokenProcessor.prototype.process = function(provider, block) {
  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    if (tx.logs != null) {
      for (var j = 0; j < tx.logs.length; j++) {
        var ev = tx.logs[j];
        // We check if the event is an ERC20 token transfer
        if (ev.topics[0].toLowerCase() == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' && ev.topics.length == 3) {
          var obj = {
            token_address: provider.normalizeHash(ev.address),
            from_address: provider.logTopicToAddress(ev.topics[1]),
            to_address: provider.logTopicToAddress(ev.topics[2]),
            value: provider.w3.utils.hexToNumberString(ev.data),
            transaction_hash: provider.normalizeHash(ev.transactionHash),
            log_index: ev.logIndex,
            block_number: ev.blockNumber,
          };
          console.log(obj);
          this.writer.insert(this.type, obj);
        }
      }
    }
  }
}

module.exports = TokenProcessor;
