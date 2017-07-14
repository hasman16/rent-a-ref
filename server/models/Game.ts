
const Game = function(sequelize, DataTypes) {
  return sequelize.define('game', {
      name: DataTypes.STRING(64),
      date: DataTypes.DATE
  }, {
      paranoid: true, //mark as deleted but do not delete
      underscored: true //use underscore instead of camelCase.
  });
};

export default Game;
