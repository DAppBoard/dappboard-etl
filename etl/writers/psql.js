pg = require('pg')
var knex = require('knex')({client: 'pg'});

function Writer(connectInfos) {
  connectInfos.max = 3;
  this.pool = new pg.Pool(connectInfos)
  this.knex = knex;
  console.log('init writer')
}

Writer.prototype.client = async function() {
  const client = await this.pool.connect();
  return client;
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

Writer.prototype.getMax = async function(type, field) {
  var c = await this.client()
  var query = this.knex.max(field).from(type).toString()
  console.log(query)
  var res = await c.query(query)
  c.release();
  if (res != null && res.rows[0] != null) {
    return (parseInt(res.rows[0].max));
  }
  else {
    return (null);
  }
}

module.exports = Writer;
