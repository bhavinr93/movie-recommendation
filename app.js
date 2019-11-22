var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
// var cors = require('cors');
var http = require('http');
const dotenv = require('dotenv');
dotenv.config();

var port = process.env.PORT;
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', require('./routes/api/index'));

// all of our routes will be prefixed with /api
// app.use('/api', router);
var server = http.createServer(app);
server.listen(port, function () {
    console.log('HTTP server listening on port ' + port);
});

module.exports = app;