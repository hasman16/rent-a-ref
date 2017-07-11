import config from '../config/index';
import Sequelize from 'sequelize';

var models = [
  'Game',
  'Person',
  'Sport',
  'User',
];

const serverName = process.env.serverName || 'test';
const configuration = config[serverName];
const database = configuration.database;

//connect to database using sequelize
export const sequelize = new Sequelize(
  database.name, database.user,
  database.password,
  database.settings
);
console.log('setting:', database.settings);
//Export models
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
  m.Person.belongsTo(m.User);

  m.Person.belongsToMany(m.Sport, {
      through: 'referee'
  });

  m.Person.belongsToMany(m.Game, {
      through: 'match'
  });

  m.Sport.belongsToMany(m.Game, {
      through: 'match'
  });

  module.exports.Referee = sequelize.models.referee;
  module.exports.Match = sequelize.models.match;

})(module.exports);

console.log('=========== Database is:', serverName);

//sequelize.sync();

//Export sequelize
//export sequelize;
