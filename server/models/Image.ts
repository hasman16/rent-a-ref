export default function(sequelize, DataTypes) {
    return sequelize.define('image', {
        image: {
          type: DataTypes.BLOB('long'),
          allowNull: false
        }
    }, {
        paranoid: true, // mark as deleted but do not delete
        underscored: true // use underscore instead of camelCase.
    });
};
