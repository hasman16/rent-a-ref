const Match = function(sequelize, DataTypes) {
  return sequelize.define(
    'match',
    {
      venue_name: {
        type: DataTypes.STRING(64)
      },
      status: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: 'none',
        validate: {
          isIn: [['none', 'pending', 'played', 'cancelled', 'active']]
        }
      },
      age: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          isIn: [['kids', 'teens', 'adults']]
        }
      },
      match_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      referees: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    }
  );
};

export default Match;


