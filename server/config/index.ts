const Sequelize = require("sequelize");

const sequelizeSettings = {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
};

export default {
  test: {
    server: {
      serverName: 'test',
      PORT: 8000,
      JWT_SECRET: 'bobulousquest',
    },
    database: {
      name: 'test',
      user: 'postgres',
      password: 'ace1',
      settings: sequelizeSettings
    }
  },
  dev: {
    server: {
      serverName: 'dev',
      PORT: 8000,
      JWT_SECRET: 'bobulousquest',
    },
    database: {
      name: 'mydb',
      user: 'postgres',
      password: 'ace1',
      settings: sequelizeSettings
    }
  }
};
