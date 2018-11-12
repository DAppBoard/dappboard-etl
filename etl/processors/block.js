
function BlockProcessor(writer) {
  this.name = "Block processor";
  this.version = 1;
  this.writer = writer;
  this.type = "blocks";
}

BlockProcessor.prototype.process = function(block) {
  var obj = {
    difficulty: block.difficulty,
    extra_data: block.extraData,
    gas_limit: block.gasLimit,
    gas_used: block.gasUsed,
    hash: block.hash,
    logs_bloom: block.logsBloom,
    miner: block.miner,
    mix_hash: block.mixHash,
    nonce: block.nonce,
    number: block.number,
    parent_hash: block.parentHash,
    receipts_root: block.receiptsRoot,
    sha3_uncles: block.sha3Uncles,
    size: block.size,
    state_root: block.stateRoot,
    timestamp: block.timestamp,
    total_difficulty: block.totalDifficulty,
    transaction_count: block.transactions.length,
    transactions_root: block.transactionsRoot,
  }
  this.writer.insert(this.type, obj);
}

module.exports = BlockProcessor;
