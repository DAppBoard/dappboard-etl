function EventProcessor(writer) {
  this.name = "Event processor";
  this.version = 1;
  this.writer = writer;
  this.type = "events";
}

EventProcessor.prototype.process = function(block) {
  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    if (tx.logs != null) {
      for (var j = 0; j < tx.logs.length; j++) {
        var ev = tx.logs[j];
        var obj = {
          block_hash: ev.blockHash.toLowerCase(),
          blockNumber: ev.blockNumber,
          data: ev.data,
          log_index: ev.logIndex,
          topic_0: ev.topics[0].toLowerCase(),
          topic_1: ev.topics.length > 1 ? ev.topics[1].toLowerCase() : null,
          topic_2: ev.topics.length > 2 ? ev.topics[2].toLowerCase() : null,
          topic_3: ev.topics.length > 3 ? ev.topics[3].toLowerCase() : null,
          transaction_hash: ev.transactionHash.toLowerCase(),
          transactionIndex: ev.transactionIndex
        };
        this.writer.insert(this.type, obj);
      }
    }
  }
}

module.exports = EventProcessor;
