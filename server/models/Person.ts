
const Person = function(sequelize, DataTypes) {
  return sequelize.define('person', {
      firstname: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      middlenames: DataTypes.STRING(64),
      lastname: DataTypes.STRING(64),
      sex: {
          type: DataTypes.STRING(1),
          allowNull: false,
          validate: {
              is: /^(m|f)$/i
          }
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false
      }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
  });
};

export default Person;
