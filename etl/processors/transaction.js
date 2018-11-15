
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
      block_number: tx.blockNumber,
      from_address: provider.normalizeHash(tx.from),
      to_address: provider.normalizeHash(tx.to),
      gas: tx.gas,
      gas_price: tx.gasPrice,
      hash: provider.normalizeHash(tx.hash),
      input: provider.normalizeHash(tx.input),
      nonce: tx.nonce,
      transaction_index: tx.transactionIndex,
      value: tx.value,
      cumulative_gas_used: tx.cumulativeGasUsed,
      contract_address: tx.contractAddress,
      gas_used: tx.gasUsed,
      status: tx.status
    };
    this.writer.insert(this.type, obj);
  }
}

module.exports = TransactionProcessor;
