const bodyParser  = require('body-parser');
const config      = require('./config.js');
const db					= require('./database.js');
const express     = require('express');
const hbs         = require('express-handlebars');
const assert = require('assert');
var Heap = require('heap');

// INitialize queue (delete later)
  var queue = new priorityQueue();

  var p1 = new patientNode(1, 'Ryan', 'Shin', 5, 2);
  var p2 = new patientNode(2, 'Sean', 'Hinds', 7, 5);
  var p3 = new patientNode(3, 'Foo', 'Bar', 9, 2);
  var p4 = new patientNode(4, 'Peter', 'Parker', 8, 1);
  var p5 = new patientNode(5, 'Chris', 'Smith', 1, 1);
  var p6 = new patientNode(6, 'Du', 'Zheng', 9, 1);

  queue.pushPatient(p1);
  queue.pushPatient(p2);
  queue.pushPatient(p3);
  queue.pushPatient(p4);
  queue.pushPatient(p5);
  queue.pushPatient(p6);

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
        return array;
    }
}

function patientNode (pid, fname, lname, time, priority) {
    this.pid = pid;
    this.fname = fname;
    this.lname = lname;
    this.time = time;
    this.priority = priority;
}

const PORT  = process.argv[2] || 3612;

// CREATES TABLE IF IT DOESN'T EXIST, AND SEEDS DATABASE
db.runMigrations('migrations').then(db.seedDb('a_patients', 'seeds'));

// Setup Server
const app = express();

// Set view engine to be handlebars
app.engine('.hbs', hbs({extname: '.hbs', defaultLayout: 'main'}) );
app.set('view engine', '.hbs');

// Setup Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Set Static Folder for CSS/JS
app.use(express.static('public'));

// Main Route
app.get('/', ( req, res ) => res.render('index') );

app.get('/check-in-new', ( req, res ) => res.render('checkin-new') );

app.get('/check-in-returning', ( req, res ) => res.render('checkin-returning') );

app.get('/pop-patient', function(req, res) {
  queue.popPatient();
  res.send(null);
});

app.get('/queue-manager', function(req, res) {
  var context = {};
  context.list = queue.getList();
  res.render('queue-manager', context);
});

// Catchall to re-route back to beginning
app.get('*', (req,res) => res.redirect('/') );

// Not Found (should never be hit)
app.use( (req,res) => res.send(404, '404 - Not Found') );

// Server Error
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.send(500, '500 - Server Error');
});

// Start Server
app.listen(PORT, () => console.log(`Express started on http://localhost:${PORT} press Ctrl-C to terminate.`) );
