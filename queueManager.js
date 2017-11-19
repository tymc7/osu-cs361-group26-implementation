const assert = require('assert');
var Heap = require('heap');

module.exports = priorityQueue;

//Priority Queue Object Constructor
function priorityQueue(){
    this.count = 0;
    this.heap = new Heap(function(p1,p2){
        var test = p2.priority - p1.priority;
        if (test == 0) {
            // comparing real date/time is preferable
            return p1.time - p2.time;
        } else {
            return test;
        }
    });

    this.peekPatient = function(){
        return this.heap.peek();
    }

    this.popPatient = function(){
        this.heap.pop();
    }

    this.pushPatient = function(patient) {
        this.count++;
        this.heap.push(patient);
    }
      
    this.prioritize = function(patient, newPriority) {
        patient.priority = newPriority;
        this.heap.updateItem(patient);
    }
    this.getList = function(){
        var array = this.heap.toArray();
        console.log(array);
        return array;
    }
}

function patientNode ( pid, time, priority) {

    this.pid = pid;
    this.time = time;
    this.priority = priority;
}

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
