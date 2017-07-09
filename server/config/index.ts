var sequelizeSettings = {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
};

var heroku = {
  host: 'ec2-54-221-254-72.compute-1.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
};

export default {
  heroku: {
    server: {
      serverName: 'heroku',
      PORT: 5432,
      JWT_SECRET: 'bobulousquest',
    },
    database: {
      name: 'de2eji79grjcf9',
      user: 'cvtmigxnzaoraq',
      password: 'd4aef6cf6ac1c955d971f458acc712ccb41742b2104a50436ea8b046ed1ec372',
      settings: heroku
    }
  },
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
