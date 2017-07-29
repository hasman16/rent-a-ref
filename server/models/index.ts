import * as dotenv from 'dotenv';
import config from '../config/index';
import Sequelize from 'sequelize';

dotenv.load({ path: '.env' });

const models = [
  'Address',
  'Game',
  'Organization',
  'Person',
  'Phone',
  'Sport',
  'User',
];

function herokuSetup() {
  console.log('=========== Database is: heroku');
  return new Sequelize(process.env.DATABASE_URL);
}

function localhostSetup() {
  const serverName = process.env.serverName || 'test';
  const configuration = config[serverName];
  const database = configuration.database;
  console.log('=========== Database is:', serverName);
  // connect to database using sequelize
  return new Sequelize(
    database.name, database.user,
    database.password,
    database.settings
  );
}


let sqlize;
if (process.env.DATABASE_URL) {
  sqlize = herokuSetup();
} else {
  sqlize = localhostSetup();
}

export const sequelize = sqlize;

// Export models
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
  m.User.hasOne(m.Person);

  m.User.belongsToMany(m.Sport, {
    through: 'referee'
  });

  m.User.hasMany(m.Organization);

  m.User.belongsToMany(m.Organization, {
    through: 'organizer'
  });

  m.User.belongsToMany(m.Address, {
    through: 'user_addresses'
  });

  m.User.belongsToMany(m.Phone, {
    through: 'user_phone'
  });

  m.Game.belongsTo(sequelize.models.organizer);

  m.User.belongsToMany(m.Game, {
    through: 'match'
  });

  m.User.belongsToMany(m.Game, {
    through: 'match'
  });

  m.Organization.belongsToMany(m.Address, {
    through: 'organization_addresses'
  });

  m.Organization.belongsToMany(m.Phone, {
    through: 'organization_phone'
  });

  module.exports.Referee = sequelize.models.referee;
  module.exports.Match = sequelize.models.match;
  module.exports.Organizer = sequelize.models.organizer;
  module.exports.OrganizationAddress = sequelize.models.organization_address;
  module.exports.OrganizationPhone = sequelize.models.organization_phone;
  module.exports.PersonAddress = sequelize.models.user_address;
  module.exports.PersonPhone = sequelize.models.user_phone;
})(module.exports);
