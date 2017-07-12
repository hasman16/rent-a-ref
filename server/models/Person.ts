
const Person = function(sequelize, DataTypes) {
  return sequelize.define('person', {
      firstname: DataTypes.STRING(64),
      middlenames: DataTypes.STRING(64),
      lastname: DataTypes.STRING(64),
      sex: {
          type: DataTypes.STRING(1),
          validate: {
              is: /^(m|f)$/i
          }
      },
      dob: DataTypes.DATE,
      authorization: DataTypes.INTEGER
  }, {
      paranoid: true, //mark as deleted but do not delete
      underscored: true //use underscore instead of camelCase.
  });
};

export default Person;