const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');   // npm install serve-favicon
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const app = express();

const locations = require('./api/locations');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/locations', locations);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Fount');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;