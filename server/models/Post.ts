export default function(sequelize, DataTypes) {
    return sequelize.define('post', {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        published: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
}
