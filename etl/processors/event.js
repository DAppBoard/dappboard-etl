function EventProcessor(writer) {
  this.name = "Event processor";
  this.version = 1;
  this.writer = writer;
  this.type = "events";
}

EventProcessor.prototype.process = function(provider, block) {
  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    if (tx.logs != null) {
      for (var j = 0; j < tx.logs.length; j++) {
        var ev = tx.logs[j];
        var obj = {
          block_hash: provider.normalizeHash(ev.blockHash),
          block_number: ev.blockNumber,
          data: provider.normalizeHash(ev.data),
          log_index: ev.logIndex,
          topic_0: provider.normalizeHash(ev.topics[0]),
          topic_1: ev.topics.length > 1 ? provider.normalizeHash(ev.topics[1]) : null,
          topic_2: ev.topics.length > 2 ? provider.normalizeHash(ev.topics[2]) : null,
          topic_3: ev.topics.length > 3 ? provider.normalizeHash(ev.topics[3]) : null,
          transaction_hash: provider.normalizeHash(ev.transactionHash),
          transaction_index: ev.transactionIndex,
          address: ev.address,
        };
        this.writer.insert(this.type, obj);
      }
    }
  }
}

module.exports = EventProcessor;
