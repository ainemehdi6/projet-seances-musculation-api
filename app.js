var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var exerciceRouter = require('./routes/exercice');
var seanceRouter = require('./routes/seance');

var app = express();

// Intégration de la bdd
var connectionString = "mongodb+srv://ainemehdi6:Mehdi2021@iut.gxa1cl9.mongodb.net/test";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/exercices', exerciceRouter);
app.use('/seances', seanceRouter);

module.exports = app;
