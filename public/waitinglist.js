document.addEventListener('DOMContentLoaded', addDeleteButton);

function reqPopPatient() {
  var req = new XMLHttpRequest();
  req.open("GET", "/pop-patient", true);
  req.addEventListener('load', function(){
    if(req.status >=200 && req.status <400){
      console.log('Made it this far')
      // Go to /queue-manager (refresh)
      window.location.href = '/queue-manager'
    } else {
      console.log("Error in network request: " + req.statusText);
    }
    req.send(null);
    //event.preventDefault();
  });
}

function addDeleteButton(){
  var delButton = document.getElementById('delButton');
  delButton.onclick = function () {
    var delButton = document.getElementById('delButton');
    var req = new XMLHttpRequest();
    req.open("GET", "/pop-patient", true);
    req.addEventListener('load', function(){
      if(req.status >=200 && req.status <400){
        console.log('Made it this far')
        // Go to /queue-manager (refresh)
        window.location.href = '/queue-manager'
      } else {
        console.log("Error in network request: " + req.statusText);
      }
      //event.preventDefault();
    });
    req.send(null);
  };
  //delButton.addEventkistener('click', reqPopPatient);
  event.preventDefault();
}

function removeEntry(id) {
  var req = new XMLHttpRequest();
  req.open("GET", "/delete?id=" + id, true);
  req.addEventListener('load', function(){
    if(req.status >=200 && req.status <400){
      fillTable();
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function updateEntry() {
  var req = new XMLHttpRequest();

  var name = document.getElementById('name').value;
  var reps = document.getElementById('reps').value;
  var date = document.getElementById('date').value;
  var weight = document.getElementById('weight').value;
  var id = document.getElementById('id').value;

  req.open("GET", "/update?name="+name+"&reps="+reps+"&date="+date+"&weight="+weight+"&id="+id, true);
  req.addEventListener('load', function(){
    if(req.status >=200 && req.status <400){
      location.href='/';
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function addEntry(){
  var req = new XMLHttpRequest();

  var name = document.getElementById('name').value;
  var reps = document.getElementById('reps').value;
  var date = document.getElementById('date').value;
  var weight = document.getElementById('weight').value;

  req.open("GET", "/insert?name="+name+"&reps="+reps+"&date="+date+"&weight="+weight, true);
  req.addEventListener('load', function(){
    if(req.status >=200 && req.status <400){
      fillTable();
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function myFunctions(){
  if(document.getElementById('myTable'))
  {
    fillTable();
  }
}
