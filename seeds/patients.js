const data = require('../seed-data/patients');

exports.seed = function(knex, Promise) {
  var patientPromises = [];
  data.forEach(function(patient){
    patientPromises.push(createPatient(knex, patient));
  });

  return Promise.all(patientPromises);
};

function createPatient(knex, patient) {
  return knex.table('a_patients')
    .returning('id')
    .insert(patient);
}
