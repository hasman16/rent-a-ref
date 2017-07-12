import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import * as models from './models';
import importData from './data';
import setRoutes from './routes';

const app = express();
const sequelize = models.sequelize;

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

app.use(morgan('dev'));

importData(models, true); //set to false to bypass importing data
setRoutes(app, models);

process.on('uncaughtException', function(err) {
    console.log(err);
    // res.render('404');
});

app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});

export { app };
