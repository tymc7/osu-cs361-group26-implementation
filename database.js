const CONFIG 	= require('./config.js');
const knex    = require('knex')(CONFIG); // DOCS: http://knexjs.org/#Builder
const mysql		= require('mysql');

exports.runMigrations = (directory) => {
  return knex.migrate.latest({
    directory: directory
  });
}

exports.seedDb = (table, directory) => {
  return knex(table).count('id as c').then( (c) => {
    if(c[0].c === 0) {
      console.log('SEEDING DATABASE');
      return knex.seed.run({
        directory: directory
      });
    } else {
      console.log('DATABASE ALREADY SEEDED');
      return null;
    }
  } );

}

// NEED TO FIND A BETTER WAY TO VALIDATE PATIENT
// function validatePatientSchema(patient) {
//
// }

// Creates Patient
// Gets passed a Patient Object that should match Schema
exports.createRow = (table, data) => {
	// if(!validatePatientSchema(patient))
	// 	throw new Error('Does not match Patient Schema');
  return knex.table(table)
    .returning('id')
    .insert(data);
}

exports.updateRow = (table, id, updateObj) => {
	// if(!validatePatientSchema(patient))
	// 	throw new Error('Does not match Patient Schema');
  return knex.table(table)
    .returning('id')
    .where('id', '=', id)
    .update(updateObj);
}

exports.searchForPatient = () => {
}

exports.validatePatient = () => {

}
