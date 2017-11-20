const assert      = require('assert');
const patientNode = require('../models/patientNode.js');
const queue       = require('../models/queueManager.js');

// test for pid's matching
// Time should never match, but if they do, system shouldnt fail
describe('queueManager', () => {
  let p1        = patientNode.patientNode(1, 'Joe', 'Smith', 6, 100);
  let p2        = patientNode.patientNode(2, 'Jill', 'Miller', 3, 300);
  let p3        = patientNode.patientNode(3, 'Ann', 'Johnson', 7, 200);
  let testqueue = queue.priorityQueue();

  before(() => {
    testqueue.pushPatient(p1);
    testqueue.pushPatient(p2);
    testqueue.pushPatient(p3);
    testqueue.getList();
  });

  describe('#peekPatient', () => {
    it('should return the top of the stack, patient 2', () => {
      assert.deepEqual(testqueue.peekPatient(), p2);
    });
  });
  describe('#popPatient', () => {
    it('should remove the top of the stack, patient 2', () => {
      assert.deepEqual(testqueue.popPatient(), p2);
    });
    it('should not contain patient 2 anymore', () => {
      assert.deepEqual(testqueue.peekPatient(), p3);
    })
  });
  describe('#pushPatient', () => {
    it('should return patient 2 after adding', () => {
      let x = testqueue.pushPatient(p2);
      assert.deepEqual(x, p2);
    });
    it('should add patient 2 back to the list', () => {
      assert.deepEqual(testqueue.peekPatient(), p2);
    });
  });

  describe('#prioritize', () => {
    it('should reprioritize patient 1 to be 500', () => {
      testqueue.prioritize(p1.pid, 500);
      assert.equal(testqueue.peekPatient().priority, 500);
    });
    it('should move patient 1 to be first', () => {
      assert.deepEqual(testqueue.peekPatient(), p1);
    });
  });

  describe('#getList', () => {
    let y = testqueue.getList();
    it('should return the queue as an array', () => {
      assert.equal(Array.isArray(y), true);
    });
  });

});
