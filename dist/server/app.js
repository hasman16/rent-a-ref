"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var handlebars = require("express-handlebars");
var models = require("./models");
var data_1 = require("./data");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
var sequelize = models.sequelize;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.set('views', path.join(__dirname + '/views'));
app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next();
});
app.use(morgan('dev'));
// sequelize.sync();
data_1.default(models, true); // set to false to bypass importing data
routes_1.default(app, models);
app.post('/resetpassword', function (req, res) {
    res.render('resetpassword');
});
app.post('/resetpassword', function (req, res) {
    res.redirect('404');
});
app.get('/resetpassword/:passcode', function (req, res) {
    res.render('resetpassword', {
        passcode: req.params.passcode
    });
});
process.on('uncaughtException', function (err) {
    console.log(err);
    // res.render('404');
});
app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map