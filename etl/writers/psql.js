pg = require('pg')
var knex = require('knex')({client: 'pg'});

function Writer(connectInfos) {
  this.pool = new pg.Pool(connectInfos)
  this.knex = knex;
  console.log('init writer')
}

Writer.prototype.client = async function() {
  const client = await this.pool.connect();
  return client;
}

Writer.prototype.check_if_exists = function(type, id) {
  console.log('check if exists', type, id);
  return (false);
}

Writer.prototype.insert = async function(type, obj) {
  //  console.log('insert', type, obj);
  var c = await this.client()
  var query = this.knex(type).insert(obj).toString()
  c.query(query, (err, res) => {
    console.log(err, res)
    c.release()
  })
}

module.exports = Writer;
