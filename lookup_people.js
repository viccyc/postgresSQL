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
    // let year = rows[key].birthdate.getFullYear();
    // let month = (rows[key].birthdate.getMonth() + 1);
    // let day = rows[key].birthdate.getDate();
    // let stringDate =  year + '-' + month + '-' + day;
    // // console.log('month.length: ', typeof month);
    // if (month > 10) {
    //   month = '0' + month;
    // }
    // if (day.length === 1) {
    //   day = '0' + day;
    // }

    console.log(`-${rowNum}: ${rows[key].first_name} ${rows[key].last_name}, born ${date}`)
  }
  process.exit();
});

app.listen(3000);