const assert        = require('assert');
const bodyParser    = require('body-parser');
const config        = require('./config.js');
const db            = require('./database.js');
const express       = require('express');
const session       = require('express-session');
const hbs           = require('express-handlebars');
const Heap          = require('heap');
const notification  = require('./models/notificationEngine.js');
const pn            = require('./models/patientNode.js');
const pq            = require('./models/queueManager.js');

var queue = pq.priorityQueue();

// let x = notification.createPublisher('test')
// .then( (id) => {
//   return notification.createSubscriber(23, `test${id[0]}@test.com`)
//   .then(notification.publishMessage(23, 'testingggggg' ))
// })

// // Initialize queue (delete later)
// var p1 = pn.patientNode(1, 'Ryan', 'Shin', 5, 2);
// var p2 = pn.patientNode(2, 'Sean', 'Hinds', 7, 5);
// var p3 = pn.patientNode(3, 'Foo', 'Bar', 9, 2);
// var p4 = pn.patientNode(4, 'Peter', 'Parker', 8, 1);
// var p5 = pn.patientNode(5, 'Chris', 'Smith', 1, 1);
// var p6 = pn.patientNode(6, 'Du', 'Zheng', 9, 1);
//
// queue.pushPatient(p1);
// queue.pushPatient(p2);
// queue.pushPatient(p3);
// queue.pushPatient(p4);
// queue.pushPatient(p5);
// queue.pushPatient(p6);

const PORT  = process.argv[2] || 3612;

// CREATES TABLE IF IT DOESN'T EXIST, AND SEEDS DATABASE
console.log('Running Migrations');
db.runMigrations('migrations').then(db.seedDb('a_patients', 'seeds'));

// Setup Server
const app = express();

// Setup session
app.use(session({
    secret: 'SuperSecretPassword',
    resave: true,
    saveUninitialized: true
}));

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

app.get('/view-patient-info', ( req, res ) => res.render('view-patient-info') );

app.get('/edit-patient-info', ( req, res ) => res.render('edit-patient-info') );

//Queue Manager
app.get('/queue-manager', function(req, res) {
    var context = {};
    context.list = queue.getList();
    res.render('queue-manager', context);
});

app.get('/queue-manager/pop-patient', function(req, res) {
    console.log('patient popped')
    queue.popPatient();
    res.send(null);
});

app.get('/queue-manager/prioritize', function(req, res) {
    var pid = req.query.pid;
    var priority = req.query.priority;
    if (priority == '' || pid == ''){
        //send error
        console.log('EMPTY FIELD');
        res.status(203);
        res.send(null);
        return;
    }
    //search list for patient
    var flag = queue.prioritize(pid, priority);
    if (flag == -1) {
        //send error
        console.log('NO MATCH');
        res.status(202);
    }
    res.send(null);
});

//Register for new patient
app.post('/check-in-new', (req, res) => {
    var context = {};
    console.log(req.body);
    if (req.body.first_name != '' && req.body.last_name != '' && req.body.ssn != '') {
        //Insert new patient into database
        patientId = 0;
        db.createRow('a_patients', req.body)
            .then((data) => {
                patientId = data[0];
                if ( patientId ) {
                    // Creation Successful
                    console.log('Register successful');
                    context.success = 1;
                    context.message = "Register Successful";
                    req.session.patientId = patientId;
                    req.session.patientData = req.body;
                    console.log(req.session);
                    return res.redirect('/connecting-device');
                } else {
                    // Creation Failed
                    console.log('Register failed');
                    context.failure = 1;
                    context.message = "Register Failed";
                    return res.redirect('/check-in-new');
                }
            })
            .catch( (e) => console.log(e, e.stack) );
    } else {
        console.log('Need first_name, last_name and ssn to register.');
        context.failure = 1;
        context.message = "Need First Name, Last Name and SSN to Register";
        return res.render('checkin-new', context);
    }
});

//Log-in and authentication
app.post('/check-in-returning', (req, res) => {
    var context = {};
    console.log(req.body);
    //All entries must be filled
    if (req.body.first_name != '' && req.body.last_name != '' && req.body.ssn != '') {
        //Query the database for a match
        //If match is found.
        patientId = 0;
        db.existRow('a_patients', req.body).then( (row) => {
            patientId = ( typeof row[0] !== 'undefined' && 'id' in row[0] && row[0].id ) ? row[0].id : 0;
            console.log(patientId);
            if ( patientId ) {
                // Found matching patient
                console.log('Found patient in db');
                context.success = 1;
                context.message = "Login Successful";
                req.session.patientId = patientId;
                req.session.patientData = req.body;
                console.log(req.session);
                return res.redirect('/connecting-device');
            } else {
                //No match, go back to checkin-new page
                console.log('Did not find patient in db');
                context.failure = 1;
                context.message = "Login Failed";
                return res.redirect('/check-in-new');
            }
        });
    } else {
        console.log('Need first_name, last_name and ssn to login.');
        context.failure = 1;
        context.message = "Need First Name, Last Name and SSN to Login";
        return res.render('checkin-returning', context);
    }
});

// Connecting device page
app.get('/connecting-device', ( req, res ) => res.render('connecting-device') );


app.get('/queue', ( req, res ) => res.render('queue') );

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
