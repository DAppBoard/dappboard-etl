
function Writer(connect_string) {
  console.log('init writer')
}

Writer.prototype.check_if_exists = function(type, id) {
  console.log('check if exists', type, id);
  return (false);
}

Writer.prototype.insert = function(type, obj) {
  console.log('insert', type, obj);
}

module.exports = Writer;
