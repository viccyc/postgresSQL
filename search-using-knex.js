const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function getFamousPeople(searchTerm, callback) {
  knex.select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where('last_name', 'like', `%${searchTerm}%`)
  .asCallback(function(err, rows) {
      if (err) return console.error(err);
      callback(rows);
  });
}

exports.getFamousPeople = getFamousPeople;



