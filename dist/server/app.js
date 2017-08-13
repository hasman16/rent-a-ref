"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var models = require("./models");
var data_1 = require("./data");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
var sequelize = models.sequelize;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next();
});
app.use(morgan('dev'));
// sequelize.sync();
data_1.default(models, true); // set to false to bypass importing data
routes_1.default(app, models);
process.on('uncaughtException', function (err) {
    console.log(err);
    // res.render('404');
});
app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map