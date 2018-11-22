export default function(sequelize, DataTypes) {
  return sequelize.define(
    'customer',
    {
      email: {
        type: DataTypes.STRING(124),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      stripe_id: {
        type: DataTypes.STRING(124),
        unique: true,
        allowNull: false
      }
    },
    {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    }
  );
}
