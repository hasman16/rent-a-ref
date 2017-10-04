export default function(sequelize, DataTypes) {
    return sequelize.define('email', {
        to: {
          type: DataTypes.STRING(128),
          allowNull: false
        },
        from: {
          type: DataTypes.STRING(128),
        },
        bcc: {
          type: DataTypes.STRING(128)
        },
        subject: {
          type: DataTypes.STRING(128),
          allowNull: false
        },
        body: {
          type:DataTypes.STRING,
          allowNull: false
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
}
