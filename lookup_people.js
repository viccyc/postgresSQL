const express = require('express');
const app = express();
var argv = require( 'argv' );
var args = process.argv.slice(2);

app.set('view engine', 'ejs');

const db = require("./database");

db.getFamousPeople(args, (rows) => {
  let count = rows.length;
  console.log(`Found ${count} person(s) by the name of '${rows[0].last_name}':`);

  for (const key in rows) {
    let rowNum = Number(key) + 1;
    let year = rows[key].bday.getFullYear();
    let month = (rows[key].bday.getMonth() + 1);
    let day = rows[key].bday.getDate();
    let stringDate =  year + '-' + month + '-' + day;
    // console.log('month.length: ', typeof month);
    // if (month > 10) {
    //   month = '0' + month;
    // }
    // if (day.length === 1) {
    //   day = '0' + day;
    // }

    console.log(`-${rowNum}: ${rows[key].first_name} ${rows[key].last_name}, born ${stringDate}`)
  }
//   Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'
});

app.listen(3000);