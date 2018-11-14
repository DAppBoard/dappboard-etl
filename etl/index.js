
var Ethereum = require ('./ethereum');
var Writer = require('./writers/psql');

var processors_to_load = [
  'block',
  // 'transaction',
  // 'event',
  // 'token',
]

var processors = [];

writer = new Writer();

for (let i = 0; i < processors_to_load.length; i++) {
  var p = require('./processors/' + processors_to_load[i]);
  // TODO check if processor is loaded successfully
  processors.push(new p(writer));
}

var eth = new Ethereum.Provider(Ethereum.ProviderType.WS, process.env.DAPPBOARD_NODE_URL);

var doBlock = async function(blocknumber) {
  block = await eth.getBlock(blocknumber);
  for (let i = 0; i < processors.length; i++) {
    processors[i].process(eth, block);
  }
}

doBlock("latest")

//console.log(eth)
