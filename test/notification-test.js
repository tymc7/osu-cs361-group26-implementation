const assert  = require('assert');
const nE      = require('../models/notificationEngine.js');

describe('notificationEngine', () => {
  var pub_id, sub_id;

  before( (done) => {
    nE.createPublisher('test-publisher')
    .then( (data) => {
      pub_id = data;
      nE.createSubscriber(pub_id, `test+${pub_id}@test.com`)
      .then( (da) => {
        sub_id = da;
      }).then(done);
    });
  });

  describe('#createPublisher', () => {
    it('should return the ID of the created publisher', () => {
      assert(pub_id)
    });
  });

  describe('#createSubscriber', () => {
    it('should return the ID of the created subscriber', () => {
      assert(sub_id);
    });
  });

  describe('#publishMessage', () => {
    it('should return 1 if all subscribers were sent message', (done) => {
      nE.publishMessage(pub_id, 'New patient added to database')
      .then( (data) => {
        assert(data, 1);
        done();
      });
    });
  });

  describe('#deleteSubscriber', () => {
    it('should return 1 if the subscriber was deleted', (done) => {
      nE.deleteSubscriber(sub_id)
      .then( (data) => {
        assert(data, 1);
        done();
      });
    });
  });

  describe('#deletePublisher', () => {
    it('should return 1 if the publisher was deleted', (done) => {
      nE.deletePublisher(pub_id)
      .then( (data) => {
        assert(data, 1);
        done();
      });
    });
  });

})
