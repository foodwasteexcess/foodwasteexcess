require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
//const axios = require('axios');

console.log(process.env.MONGO_DB_URI)
mongoose
  .connect(process.env.MONGO_DB_URI||'mongodb://localhost/foodwasteexcess', 
  {useNewUrlParser: true},
  {useUnifiedTopology: true}
  )
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//session configuration part
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge:24*60*60*1000},
    saveUninitialized:false,
    resave:true,
    store: new MongoStore({
        // when the session cookie has an expired date
        // connect-mongo will use it, otherwise it will create a new one
        // and use ttl - time to live - in that case one day
        mongooseConnection: mongoose.connection,
        ttl: 24*60*60*1000

    })
  })
)
// end of session configuration

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);


//comment Sophia: not sure if this is right: 
const auth = require('./routes/auth');
app.use('/', auth);

// routes for products

const products = require('./routes/products');
app.use('/', products);



module.exports = app;
