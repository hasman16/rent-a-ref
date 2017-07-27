export default function(sequelize, DataTypes) {
    return sequelize.define('address', {
        street1: {
          type: DataTypes.STRING,
          allowNull: false
        },
        street2: {
          type: DataTypes.STRING,
        },
        city: {
          type: DataTypes.STRING(128),
          allowNull: false,
          validate: {
            isAlpha: true
          }
        },
        state: {
          type: DataTypes.STRING(128),
          allowNull: false,
          validate: {
            isAlpha: true
          }
        },
        zip: {
          type:DataTypes.STRING(16),
          allowNull: false,
          validate: {
            is: /^\d{5}(-\d{4})?$/
          }
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
};
