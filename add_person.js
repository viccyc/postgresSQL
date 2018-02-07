// takes in the first name, last name and dob of a famous person 
// as three command line arguments and uses Knex to perform an insert

const express = require('express');
const app = express();
const argv = require( 'argv' );
let args = process.argv.slice(2);
const moment = require('moment');

app.set('view engine', 'ejs');

const db = require("./search-using-knex");

let firstName = args[0];
let lastName = args[1];
let dob = args[2];

db.insertFamousPeople(firstName, lastName, dob, (result) => {
  console.log("Num of records inserted: ", result.rowCount);
  process.exit();
});

