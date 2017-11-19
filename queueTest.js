
// test for pid's matching
// Time should never match, but if they do, system shouldnt fail

var p1 = new patientNode(2, 5, 2);
var p2 = new patientNode(1, 7, 5);
var p3 = new patientNode(3, 9, 2);



var queue = new priorityQueue();

queue.pushPatient(p1);
queue.pushPatient(p2);
queue.pushPatient(p3);

//p2 > p1 > p3
//assert.deepEqual(queue.peekPatient(), p2);
//queue.popPatient();
//assert.deepEqual(queue.peekPatient(), p1);
//queue.popPatient();
//assert.deepEqual(queue.peekPatient(), p3);


//p1 > p2 > p3
queue.prioritize(p1, 100);

queue.print();

assert.deepEqual(queue.peekPatient(), p1);
queue.popPatient();
assert.deepEqual(queue.peekPatient(), p2);
queue.popPatient();
assert.deepEqual(queue.peekPatient(), p3);

queue.print();
