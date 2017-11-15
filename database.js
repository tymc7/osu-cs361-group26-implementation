const CONFIG = require("config.js");

const PATIENT_SCHEMA = {
  "first_name": 	"string",
  "middle_name": 	"string",
  "last_name": 		"string",
  "address": 			"string",
  "city": 				"string",
  "state": 				"string",
  "zipcode": 			"number",
  "phone_number": "number",
  "ssn": 					"number",
  "symptoms": 		"string"
}

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

// Creates Patient
// Gets passed a Patient Object that should match Schema
module.createPatient = (patient) => {
	if(!validatePatientSchema(patient))
		throw new Error("Does not match Patient Schema");
}

module.updatePatient = (patient) => {
	if(!validatePatientSchema(patient))
		throw new Error("Does not match Patient Schema");
	
}

module.searchForPatient = () => {
}

module.validatePatient = () => {
	
}