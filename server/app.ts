import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import sequelize from './models';
import * as path from 'path';

import setRoutes from './routes';

const app = express();
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
sequelize.sync();
//console.log('sequelize:', sequelize);
setRoutes(app);

process.on('uncaughtException', function(err) {
    console.log(err);
    //res.render('404');
});

app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});

export { app };
