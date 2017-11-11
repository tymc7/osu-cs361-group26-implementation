const bodyParser  = require('body-parser');
// const config      = require('./config.js');
const express     = require('express');
const hbs  = require('express-handlebars');

const PORT  = process.argv[2] || 3612;

const app = express();

app.engine('.hbs', hbs({extname: '.hbs'}) );
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', ( req, res ) => res.render('index') );

app.get('*', (req,res) => res.redirect('/') );

app.use( (req,res) => res.send(404, '404 - Not Found') );

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.send(500, '500 - Server Error');
});

app.listen(PORT, () => {
  console.log(`Express started on http://localhost:${PORT} press Ctrl-C to terminate.`);
});
