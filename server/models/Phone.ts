export default function(sequelize, DataTypes) {
    return sequelize.define('phone', {
        "number": {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            is: /^\d{5}(-\d{4})?$/
          }
        },
        phone: {
          type: DataTypes.STRING
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
};
