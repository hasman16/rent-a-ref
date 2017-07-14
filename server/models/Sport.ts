
const Sport = function(sequelize, DataTypes) {
  return sequelize.define('sport', {
      name: DataTypes.STRING(64),
      duration: DataTypes.INTEGER,
      periods: DataTypes.INTEGER,
      referees: DataTypes.INTEGER
  }, {
      paranoid: true, //mark as deleted but do not delete
      underscored: true //use underscore instead of camelCase.
  });
};

export default Sport;
