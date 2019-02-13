var Ethereum = require('./ethereum');
var Writer = require('./writers/psql');

var processors_to_load = [
  'block',
  'transaction',
  'event',
  'token',
]

var processors = [];

writer = new Writer({
  user: process.env.DAPPBOARD_PSQL_USER,
  host: process.env.DAPPBOARD_PSQL_HOST,
  database: process.env.DAPPBOARD_PSQL_DB,
  password: process.env.DAPPBOARD_PSQL_PASSWORD,
  port: 25061,
  ssl: true,
});

var runs = 0;

//console.log(process.env.DAPPBOARD_NODE_URL)
var eth = new Ethereum.Provider(Ethereum.ProviderType.WS, process.env.DAPPBOARD_NODE_URL);


var pastRun = async function() {
  var dbBlock = await writer.getMin('blocks', 'number');
  if (dbBlock == null || isNaN(dbBlock)) {
    console.log('We dont have any block')
    dbBlock = liveBlock - 100;
  }
  if (runs < 5) {
    console.log('This is the first run')
    dbBlock +=  runs - 5;
    runs++;
  }
  dbBlock--;
  doBlock(dbBlock, function() {
    pastRun();
  });
}

for (let i = 0; i < processors_to_load.length; i++) {
  var p = require('./processors/' + processors_to_load[i]);
  // TODO check if processor is loaded successfully
  processors.push(new p(writer));
}

var doBlock = async function(blocknumber, cb) {
  console.log('Getting infos for block', blocknumber)
  eth.getBlock(blocknumber, function(block) {
    console.log('got block')
    for (let i = 0; i < processors.length; i++) {
      processors[i].process(eth, block);
    }
    console.log('applied writers')
    cb();
  });
}

pastRun()
