function TokenProcessor(writer) {
  this.name = "Token processor";
  this.version = 1;
  this.writer = writer;
  this.type = "events";
}

TokenProcessor.prototype.process = function(block) {
  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    if (tx.logs != null) {
      for (var j = 0; j < tx.logs.length; j++) {
        var ev = tx.logs[j];
        // We check if the event is an ERC20 token transfer
        if (ev.topics[0].toLowerCase() == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' && ev.topics.length == 3) {
          var obj = {
            token_address: ev.address.toLowerCase(),
            from_address: ev.topics[1].toLowerCase(),
            to_address: ev.topics[2].toLowerCase(),
            value: "data", // TODO decode the data to get the amount
            transaction_hash: ev.transactionHash.toLowerCase(),
            log_index: ev.logIndex,
            block_number: ev.blockNumber,
          }
          console.log(obj.token_address);
        }
      }
    }
  }
}

module.exports = TokenProcessor;
