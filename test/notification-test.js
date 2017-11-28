const assert  = require('assert');
const nE      = require('../models/notificationEngine.js');

describe('Notification', () => {
  let pub_id, sub_id;

  before(() => {
    nE.createPublisher('test-publisher')
    .then( (data) => {
      pub_id = data;
      return;
    });
  })
  describe('#createPublisher', () => {
    it('should return the ID of the created publisher', () {
      assert(pub_id);
    });
  });

  describe('#createSubscriber', () => {

  });

  describe('#publishMessage', () => {

  });

  describe('#deleteSubscriber', () => {

  });

  describe('#deletePublisher', () => {

  });

})
