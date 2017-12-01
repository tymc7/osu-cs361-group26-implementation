document.addEventListener('DOMContentLoaded', myFunctions);

function addDeleteButton(){
    var delButton = document.getElementById('delButton');
    delButton.onclick = function () {
        var req = new XMLHttpRequest();
        req.open('GET', '/queue-manager/pop-patient', true);
        req.addEventListener('load', function(){
            if(req.status >=200 && req.status <400){
                console.log('Made it this far')
                // Go to /queue-manager (refresh)
                window.location.href = '/queue-manager'
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(null);
    };
}

function bindEditButton(){
    var editButton = document.getElementById('editButton');
    editButton.onclick = updatePriority;
}

function updatePriority() {
    var req = new XMLHttpRequest();

    var pid = document.getElementById('pid').value;
    var priority = document.getElementById('priority').value;

    req.open("GET", "/queue-manager/prioritize?pid="+ pid + "&priority=" + priority, true);

    req.addEventListener('load', function(){
        if(req.status >=200 && req.status <400){
            console.log(req.status);
            if (req.status == 202){
                console.log('no match');
                //Add Error Message to HTML
                formErrorMessage("Patient ID does not match any in list");
            }
            else if (req.status == 203){
                console.log('empty fields');
                //Add Error Message to HTML
                formErrorMessage("One or more fields are empty");
            }
            else {
                window.location.href = '/queue-manager';
            }
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });

    req.send(null);
    event.preventDefault();
}


function formErrorMessage(msg){
    var formError = document.getElementById("form-error");
    formError.innerHTML = "";
    formError.classList.add("alert");
    formError.classList.add("alert-danger");
    var strong = document.createElement("strong");
    var text = document.createTextNode(msg);
    strong.appendChild(text);
    formError.appendChild(strong);
}

function myFunctions(){
    bindEditButton();
    addDeleteButton();
}
