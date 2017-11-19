document.addEventListener('DOMContentLoaded', myFunctions);

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

function bindEditButton(){
    var editButton = document.getElementById('editButton');
    editButton.onclick = updatePriority;
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

function updatePriority() {
    var req = new XMLHttpRequest();

    var pid = document.getElementById('pid').value;
    var priority = document.getElementById('priority').value;

    req.open("GET", "/prioritize?pid="+ pid + "&priority=" + priority, true);

    req.addEventListener('load', function(){
        if(req.status >=200 && req.status <400){
            window.location.href = '/queue-manager';
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });

    req.send(null);
    event.preventDefault();
}


function myFunctions(){
    bindEditButton();
    addDeleteButton();
}
