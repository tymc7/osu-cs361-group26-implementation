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
      console.log('Seeding Database');
      return knex.seed.run({
        directory: directory
      });
    } else {
      console.log('Database already seeded');
      return null;
    }
  } );

}

// NEED TO FIND A BETTER WAY TO VALIDATE PATIENT
// function validatePatientSchema(patient) {
//
// }

// Check existstance, similar to searchForPatient
exports.existRow = (table, data) => {
    return knex.table(table)
        .where({
            first_name: data.first_name,
            last_name: data.last_name,
            ssn: data.ssn
        })
        .then( (row) =>  {
            return row;
        });
}

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

exports.deleteRow = (table, id) => {
  return knex.table(table)
    .where('id', '=', id)
    .del();
}

exports.getPubSubList = (pubId) => {
  return knex.select('subscriber').from('a_publishers')
  .innerJoin('a_subscribers', `a_publishers.id`,'=', `a_subscribers.pub_id`)
  .where(`a_subscribers.pub_id`, '=', pubId);
}

exports.searchForPatient = () => {
}

exports.validatePatient = () => {

}
