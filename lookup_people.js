const express = require('express');
const app = express();
var argv = require( 'argv' );
var args = process.argv.slice(2);
const moment = require('moment');

app.set('view engine', 'ejs');

const db = require("./search-using-knex");

db.getFamousPeople(args, (rows) => {
  let count = rows.length;
  console.log(`Found ${count} person(s) by the name of '${rows[0].last_name}':`);

  for (const key in rows) {
    let rowNum = Number(key) + 1;
    let date = moment(rows[key].birthdate).format("YYYY-MM-DD");   

    console.log(`-${rowNum}: ${rows[key].first_name} ${rows[key].last_name}, born ${date}`)
  }
  process.exit();
});

app.listen(3000);