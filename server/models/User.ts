export default function(sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        authorization: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isNumeric: true
          }
        },
        enabled: {
          type:DataTypes.BOOLEAN,
          allowNull: false
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
};
