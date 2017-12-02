const assert  = require('assert');
const Heap    = require('heap');

//Priority Queue Object Constructor
function priorityQueue(){
  var count = 0;

  var heap = new Heap(function(p1,p2){
    let test = p2.priority - p1.priority;
    if (test == 0) {
      // comparing real date/time is preferable
      return p1.time - p2.time;
    } else {
      return test;
    }
  });

  function peekPatient(){
    return heap.peek();
  }

  function popPatient(){
    return heap.pop();
  }

  function pushPatient(patient) {
    var array = this.heap.toArray();
    var found = false;
    // search to see if patient is already in queue
    for (var i = 0; i < array.length; i++){
      if (array[i].pid == patient.pid)
      {
        var found = true;
      }
    }
    // if not, add to queue.
    if(!found){
      count++;
      return heap.push(patient);
    }
  }

  function prioritize(pid, newPriority) {
    var array = this.heap.toArray();

    var patient;
    var found = false;
    for (var i = 0; i < array.length; i++){
      if (array[i].pid == pid)
      {
        var found = true;
        array[i].priority = newPriority;
      }
    }
    if (!found) {
      return -1;
    }
    //rebuild heap
    this.heap.heapify();
    return 1;
  }

  function getList(){
    return heap.toArray();
  }

  return {
    heap:         heap,
    peekPatient:  peekPatient,
    popPatient:   popPatient,
    pushPatient:  pushPatient,
    prioritize:   prioritize,
    getList:      getList
  }
}

module.exports = {
  priorityQueue
};
