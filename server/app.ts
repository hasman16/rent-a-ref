import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as handlebars from 'express-handlebars';

import * as models from './models';
import importData from './data';
import setRoutes from './routes';

const app = express();
const sequelize = models.sequelize;

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

app.use(morgan('dev'));
// sequelize.sync();
importData(models, true); // set to false to bypass importing data
setRoutes(app, models);

app.get('/resetpassword', function(req, res) {
    var model = ['Mary', 'had', 'a', 'little', 'lamb'];
    res.render('resetpassword', {
      model: model});
});

app.get('/resetpassword/:passcode', function(req, res) {
    var model = ['Mary', 'had', 'a', 'little', 'lamb'];
    res.render('resetpassword', {
      model: model,
      passcode: req.params.passcode});
});

process.on('uncaughtException', function(err) {
    console.log(err);
    // res.render('404');
});

app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});

export { app };
