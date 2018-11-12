
function EventProcessor(writer) {
  this.name = "Event processor";
  this.version = 1;
  this.writer = writer;
  this.type = "events";
}

EventProcessor.prototype.process = function(block) {
  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    for (var j = 0; j < tx.logs.length; j++) {
      var ev = tx.logs[j];
      var obj = {
        block_hash: ev.blockHash,
        blockNumber: ev.blockNumber,
        data: ev.data,
        log_index: ev.logIndex,
        topic_0: ev.topics[0],
        // TODO handle other topics
        transaction_hash: ev.transactionHash,
        transactionIndex: ev.transactionIndex
      };
      this.writer.insert(this.type, obj);
    }
  }
}

module.exports = EventProcessor;
