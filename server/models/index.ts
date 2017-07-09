import config from '../config/index';
import Sequelize from 'sequelize';

var models = [
  'Game',
  'Person',
  'Sport',
  'User',
];

const serverName = 'heroku';process.env.serverName || 'test';
const configuration = config[serverName];
const database = configuration.database;

//connect to database using sequelize
export const sequelize = new Sequelize(
  database.name, database.user,
  database.password,
  database.settings
);

//Export models
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
  module.exports.Game = sequelize.models.game;
  module.exports.Person = sequelize.models.person;
  module.exports.Sport = sequelize.models.sport;
  module.exports.User = sequelize.models.user;
})(module.exports);

console.log('=========== Database is:', serverName);

//sequelize.sync();

//Export sequelize
//export sequelize;
