
const Organization = function(sequelize, DataTypes) {
  return sequelize.define('organization', {
      name: {
        type: DataTypes.STRING(64),
        allowNull: false
      }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
  });
};

export default Organization;
