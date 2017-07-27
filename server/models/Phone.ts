export default function(sequelize, DataTypes) {
    return sequelize.define('phone', {
        "number": {
          type:DataTypes.STRING(64),
          allowNull: false,
          validate: {
            is: /^\d{9,}$/
          }
        },
        description: {
          type: DataTypes.STRING(64),
          allowNull: false,
          validate: {
            is: /^(mobile|home|cell|other)$/i
          }
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
};
