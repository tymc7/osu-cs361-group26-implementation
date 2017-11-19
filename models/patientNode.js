//Patient Node Object Constructor
function patientNode(pid, fname, lname, checkInTime, priority){
  return {
    pid:          pid,
    fname:        fname,
    lname:        lname,
    checkInTime:  checkInTime,
    priority:     priority
  }

}

module.exports = {
  patientNode:  patientNode
};
