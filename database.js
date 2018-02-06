const pg = require("pg");
const settings = require("./settings");

function performQuery(query, terms, callback) {
  const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((error) => {
    if (error) {
      throw error;
    }

    client.query(query, terms, (err, res) => {
      if (err) {
        throw err;
      }
      callback(res.rows);
      client.end();
    });
  });
  return;
}


function getFamousPeople(searchTerm, callback) {
  const query = `
  SELECT first_name, last_name, date(birthdate) AS bday, COUNT(id) AS numb FROM famous_people 
  WHERE last_name LIKE $1::text GROUP BY first_name, last_name, bday ORDER BY last_name`;

  const terms = [`%${searchTerm}%`]

  performQuery(query, terms, callback);
}


exports.getFamousPeople = getFamousPeople;

