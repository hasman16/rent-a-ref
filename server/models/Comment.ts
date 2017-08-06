export default function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(64)
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    });
};
