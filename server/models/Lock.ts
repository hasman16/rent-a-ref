export default function(sequelize, DataTypes) {
  return sequelize.define('lock', {
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    passcode: {
      type: DataTypes.STRING
    },
    passcode_age: {
      type: DataTypes.DATE
    }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    });
}
