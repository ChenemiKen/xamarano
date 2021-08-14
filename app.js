var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var pg = require('pg');
var bodyParser = require('body-parser');
// const session = require('express-session')

var indexRouter = require('./routes/index');

//Database
const db = require('./config/database')
//Test DB
db.authenticate()
  .then(()=> console.log('Database connected...'))
  .catch(err =>console.log('Error: '+err))

var app = express();
// var urlencodedParser=cookieParser.urlencoded({extended:falsesss});

// view engine setup
app.set( 'port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

app.listen(app.get( 'port' ), function(){
  console.log('The server is running,' +' please open your browser at http://localhost:%s',app.get( 'port' ));
});
//        or
// http.createServer(app).listen(app.get( 'port' ), function(){
//   console.log( 'Express server listening on port ' + app.get( 'port' ));
// });
