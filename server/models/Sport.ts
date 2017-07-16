
const Sport = function(sequelize, DataTypes) {
  return sequelize.define('sport', {
      name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      duration: {
        type:DataTypes.INTEGER,
        allowNull: false
      },
      periods: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      referees: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
  });
};

export default Sport;
