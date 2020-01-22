// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Config
const dbConfig = require('./config/db.config');

// Routes
const employeesRoutes = require('./routes/employee.route');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

mongoose.connect(
    `mongodb://${dbConfig.host}/${dbConfig.database}`,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Mongo DB connected')
});

// Routes
app.use('/api', employeesRoutes);

// listen for requests
app.listen(dbConfig.port, () => {
    console.log(`Server is listening on port 'http://localhost:${dbConfig.port}'`);
});

module.exports = app;
