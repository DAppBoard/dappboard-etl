
function BlockProcessor(writer) {
  this.name = "Block processor";
  this.version = 1;
  this.writer = writer;
  this.type = "blocks";
}

BlockProcessor.prototype.process = function(provider, block) {
  var obj = {
    difficulty: block.difficulty,
    extra_data: provider.normalizeHash(block.extraData),
    gas_limit: block.gasLimit,
    gas_used: block.gasUsed,
    hash: provider.normalizeHash(block.hash),
    logs_bloom: provider.normalizeHash(block.logsBloom),
    miner: provider.normalizeHash(block.miner),
    mix_hash: provider.normalizeHash(block.mixHash),
    nonce: provider.normalizeHash(block.nonce),
    number: block.number,
    parent_hash: provider.normalizeHash(block.parentHash),
    receipts_root: provider.normalizeHash(block.receiptsRoot),
    sha3_uncles: provider.normalizeHash(block.sha3Uncles),
    size: block.size,
    state_root: provider.normalizeHash(block.stateRoot),
    timestamp: block.timestamp,
    total_difficulty: block.totalDifficulty,
    transaction_count: block.transactions.length,
    transactions_root: provider.normalizeHash(block.transactionsRoot),
  };
  this.writer.insert(this.type, obj);
}

module.exports = BlockProcessor;
