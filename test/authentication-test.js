const db      = require('../database.js');
const assert  = require('assert');

describe('authentication', () => {

  describe('#login-non-existing-patient', () => {
    let patient = {
      'first_name': 'a',
      'last_name': 'c',
      'ssn': 111
    }

    it('Should return undefined row', (done) => {
      db.existRow('a_patients', patient).then( (row) => {
        assert.equal('undefined', typeof row[0]);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });
  });

  describe('#login-patient-with-incomplete-info', () => {
    let patient = {
      'first_name': 'a',
      'last_name': '',
      'ssn': 111222
    }

    it('Should return undefined row', (done) => {
      db.existRow('a_patients', patient).then( (row) => {
        assert.equal('undefined', typeof row[0]);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });
  });

  describe('#login-patient-with-more-than-enough-info', () => {
    let patient = {
      'first_name': 'a',
      'middle_name': 'b',
      'last_name': 'c',
      'ssn': 111222
    }

    it('Should return patient ID 511', (done) => {
      db.existRow('a_patients', patient).then( (row) => {
        assert.equal(511, row[0].id);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });
  });

  describe('#login-returning-patient', () => {
    let patient1 = {
      'first_name': 'a',
      'last_name': 'c',
      'ssn': 111222
    }
    it('Should return patient ID 511', (done) => {
      db.existRow('a_patients', patient1).then( (row) => {
        assert.equal(511, row[0].id);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });

    let patient2 = {
      'first_name': 'Nestor',
      'last_name': 'Stonier',
      'ssn': 246569551
    }
    it('Should return patient ID 1', (done) => {
      db.existRow('a_patients', patient2).then( (row) => {
        assert.equal(1, row[0].id);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });

    let patient3 = {
      'first_name': 'Valentine',
      'last_name': 'Mepsted',
      'ssn': 346920109
    }
    it('Should return patient ID 10', (done) => {
      db.existRow('a_patients', patient3).then( (row) => {
        assert.equal(10, row[0].id);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });

    let patient4 = {
      'first_name': 'Ansley',
      'last_name': 'McBride',
      'ssn': 996790129
    }
    it('Should return patient ID 403', (done) => {
      db.existRow('a_patients', patient4).then( (row) => {
        assert.equal(403, row[0].id);
        done();
      })
      .catch( (e) => {
        console.log(e, e.stack);
      });
    });

  });

});
