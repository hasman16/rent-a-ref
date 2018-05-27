const Price = function(sequelize, DataTypes) {
  return sequelize.define(
    'price',
    {
      description: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: '',
        validate: {
          isIn: [['kids', 'teens', 'adults']]
        }
      },
      price: {
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

export default Price;
