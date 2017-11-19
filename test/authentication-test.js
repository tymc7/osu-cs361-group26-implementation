const db   = require('../database.js');

var assert = require('assert');

describe('authentication', () => {

  describe('#login-patient', () => {
	  patient = {
		  'first_name': 'a',
		  'last_name': 'c',
		  'ssn': 111222
	  }
    it('Find patient in database', (done) => {
		db.existRow('a_patients', patient).then( (row) => {
			assert.equal(511, row[0].id);
            done();
		});
    });
  });

});
