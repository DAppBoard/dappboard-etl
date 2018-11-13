
function TransactionProcessor(writer) {
  this.name = "Transaction processor";
  this.version = 1;
  this.writer = writer;
  this.type = "transactions";
}

TransactionProcessor.prototype.process = function(provider, block) {
  for (let i = 0; i < block.transactions.length; i++) {
    var tx = block.transactions[i];
    var obj = {
      block_hash: provider.normalizeHash(tx.blockHash),
      blockNumber: tx.blockNumber,
      from: provider.normalizeHash(tx.from),
      gas: tx.gas,
      gasPrice: tx.gasPrice,
      hash: provider.normalizeHash(tx.hash),
      input: tx.input,
      nonce: tx.nonce,
      r: tx.r,
      s: tx.s,
      to: tx.to,
      transaction_index: tx.transactionIndex,
      v: tx.v,
      value: tx.value,
      cumulative_gas_used: tx.cumulativeGasUsed,
      gas_used: tx.gasUsed,
      logs_bloom: tx.logsBloom,
      status: tx.status
    };
    this.writer.insert(this.type, obj);
  }
}

module.exports = TransactionProcessor;
