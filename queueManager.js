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