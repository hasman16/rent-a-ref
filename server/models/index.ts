import * as dotenv from 'dotenv';
import config from '../config/index';
import Sequelize from 'sequelize';

dotenv.load({ path: '.env' });

const models = [
  'Address',
  'Comment',
  'Email',
  'Game',
  'Image',
  'Lock',
  'Organization',
  'Person',
  'Post',
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
  
  m.User.hasOne(m.Lock);
  m.Lock.belongsTo(m.User);

  m.User.belongsToMany(m.Sport, {
    through: 'referee'
  });

  m.User.hasMany(m.Organization);

  m.User.belongsToMany(m.Organization, {
    through: 'organizer'
  });

  m.User.belongsToMany(m.Address, {
    through: 'user_address'
  });
  m.Address.belongsToMany(m.User, {
    through: 'user_address'
  });

  m.User.belongsToMany(m.Phone, {
    through: 'user_phone'
  });
  m.Phone.belongsToMany(m.User, {
    through: 'user_phone'
  });

  m.Game.belongsTo(sequelize.models.organizer);

  m.User.belongsToMany(m.Game, {
    through: 'match'
  });
  m.User.belongsToMany(m.Game, {
    through: 'match'
  });

  m.User.hasMany(m.Post);
  m.Post.hasMany(m.Comment);

  m.Comment.belongsTo(m.Post);
  m.Post.belongsTo(m.User);

  m.Organization.belongsToMany(m.Address, {
    through: 'organization_address'
  });
  m.Address.belongsToMany(m.Organization, {
    through: 'organization_address'
  });

  m.Organization.belongsToMany(m.Phone, {
    through: 'organization_phone'
  });
  m.Phone.belongsToMany(m.Organization, {
    through: 'organization_phone'
  });

  module.exports.Referee = sequelize.models.referee;
  module.exports.Match = sequelize.models.match;
  module.exports.Organizer = sequelize.models.organizer;
  module.exports.OrganizationAddress = sequelize.models.organization_address;
  module.exports.OrganizationPhone = sequelize.models.organization_phone;
  module.exports.UserAddress = sequelize.models.user_address;
  module.exports.UserPhone = sequelize.models.user_phone;
})(module.exports);
