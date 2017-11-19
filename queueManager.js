const assert = require('assert');
var Heap = require('heap');
var patientNode = require('./patientNode');

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
      
    this.prioritize = function(pid, newPriority) {
        var array = this.heap.toArray();
        console.log('Searching through array');

        var patient;
        var found = false;
        for (var i = 0; i < array.length; i++){
            if (array[i].pid == pid)
            {
                var found = true;
                console.log('found:\n' + array[i]);
                array[i].priority = newPriority;
            }
        }
        if (!found) {
            console.log('Invalid pid');
            return -1;
        }
        //rebuild heap
        this.heap.heapify();
        return 1;
    }
    this.getList = function(){
        var array = this.heap.toArray();
        return array;
    }
}
