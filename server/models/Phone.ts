export default function(sequelize, DataTypes) {
    return sequelize.define('phone', {
        "number": {
          type:DataTypes.STRING(64),
          allowNull: false,
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
