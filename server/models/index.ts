import * as dotenv from 'dotenv';
import config from '../config/index';
import Sequelize from 'sequelize';

dotenv.load({ path: '.env' });

var models = [
  'Game',
  'Organization',
  'Person',
  'Sport',
  'User',
];

console.log('secret:', process.env.SECRET_TOKEN, process.env.DATABASE_URL);
function herokuSetup() {
  console.log('=========== Database is: heroku');
  return new Sequelize(process.env.DATABASE_URL);
}

function localhostSetup() {
  const serverName = process.env.serverName || 'test';
  const configuration = config[serverName];
  const database = configuration.database;
  console.log('=========== Database is:', serverName);
  //connect to database using sequelize
  return new Sequelize(
    database.name, database.user,
    database.password,
    database.settings
  );
}

var sqlize;
if (process.env.DATABASE_URI) {
  sqlize = herokuSetup();
} else {
  sqlize = localhostSetup();
}

export const sequelize = sqlize;

//Export models
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
  m.Person.belongsTo(m.User);

  m.Person.belongsToMany(m.Sport, {
    through: 'referee'
  });

  m.Organization.belongsTo(m.Person);
  m.Person.belongsToMany(m.Organization, {
    through: 'team'
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


//sequelize.sync();

//Export sequelize
//export sequelize;
