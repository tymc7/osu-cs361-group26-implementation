const CONFIG 	= require('./config.js');
const mysql		= require('mysql');

const db = mysql.createPool(CONFIG);

const PATIENT_SCHEMA = {
  'first_name': 	'string',
  'middle_name': 	'string',
  'last_name': 		'string',
  'address': 			'string',
  'city': 				'string',
  'state': 				'string',
  'zipcode': 			'number',
  'phone_number': 'number',
  'ssn': 					'number',
  'symptoms': 		'string'
};

function validatePatientSchema(patient) {
	let keys = Object.keys(PATIENT_SCHEMA);
	
	for(var i = 0; i < keys.length; i++){
		if(patient[keys[i]]){
			if(typeof patient[keys[i]] !== PATIENT_SCHEMA[keys[i]])
				return false;
		} else {
			return false;
		}
	}
	return true;
}

function convertObjectToSQL(obj){
 	let columns = Object.keys(obj).join(',');
	let values = Object.values(obj).join(',');
	return {
		columns: columns,
		values:	 values
	}
}

// Creates Patient
// Gets passed a Patient Object that should match Schema
exports.createPatient = (patient, cb) => {
	// if(!validatePatientSchema(patient))
	// 	throw new Error('Does not match Patient Schema');
	let sqlStrings = convertObjectToSQL(patient);
	db.getConnection( (err, con) => {
		if(err) throw err;
		con.query(`INSERT INTO patients (${sqlStrings.columns}) VALUES (${sqlStrings.vaules})`, (error,result) => {
			if(error) throw error;
			cb(result);
		});
	})
}

exports.updatePatient = (patient) => {
	if(!validatePatientSchema(patient))
		throw new Error('Does not match Patient Schema');
	
}

exports.searchForPatient = () => {
}

exports.validatePatient = () => {
	
}