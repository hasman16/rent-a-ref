const Match = function(sequelize, DataTypes) {
  return sequelize.define('match', {
    name: {
      type: DataTypes.STRING(64)
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    periods: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: DataTypes.DATE
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    });
};

export default Match;
