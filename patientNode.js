const assert = require('assert');

module.exports = patientNode;

//Patient Node Object Constructor
function patientNode(pid, fname, lname, checkInTime, priority){
    this.pid = pid;
    this.fname = fname;
    this.lname = lname;
    this.checkInTime = checkInTime;
    this.priority = priority;
}

