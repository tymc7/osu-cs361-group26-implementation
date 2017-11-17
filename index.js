const bodyParser  = require('body-parser');
const config      = require('./config.js');
const db					= require('./database.js');
const express     = require('express');
const hbs         = require('express-handlebars');

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

//Log-in and authentication
app.post('/log-in', ( req, res ) => 
    var context ={};
    //All entries must be filled
    if (req.body.fName != '' && req.body.ssn != '' && req.body.lName != ''){
        //Query the database for a match
        //If match is found.
        if () {

        //No match.
        } else{
        }
    } else {
    }
    res.render('index') );

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
