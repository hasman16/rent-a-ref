export default function(sequelize, DataTypes) {
  return sequelize.define('address', {
    line1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    line2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: {
        is: /^\d{5}(-\d{4})?$/
      }
    },
    notes: {
      type: DataTypes.STRING(128)
    }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    });
}
