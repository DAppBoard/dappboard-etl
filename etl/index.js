
var Ethereum = require ('./ethereum');
var Writer = require('./writers/psql');

var processors_to_load = [
//  'block',
   'transaction',
 //'event',
// 'token',
]

var processors = [];

writer = new Writer({
  user: process.env.DAPPBOARD_PSQL_USER,
  host: process.env.DAPPBOARD_PSQL_HOST,
  database: process.env.DAPPBOARD_PSQL_DB,
  password: process.env.DAPPBOARD_PSQL_PASSWORD,
  port: 5432,
});

for (let i = 0; i < processors_to_load.length; i++) {
  var p = require('./processors/' + processors_to_load[i]);
  // TODO check if processor is loaded successfully
  processors.push(new p(writer));
}

//console.log(process.env.DAPPBOARD_NODE_URL)
var eth = new Ethereum.Provider(Ethereum.ProviderType.WS, process.env.DAPPBOARD_NODE_URL);

var doBlock = async function(blocknumber) {
  block = await eth.getBlock(blocknumber);
  for (let i = 0; i < processors.length; i++) {
    processors[i].process(eth, block);
  }
}

doBlock(6702206)
doBlock(6702207)
doBlock(6702208)
//console.log(eth)
