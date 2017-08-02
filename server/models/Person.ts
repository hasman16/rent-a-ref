const Person = function(sequelize, DataTypes) {
  return sequelize.define('person', {
      firstname: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      middlenames: DataTypes.STRING(64),
      lastname: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      gender: {
          type: DataTypes.STRING(24),
          allowNull: false,
          validate: {
              is: /^(m|f|pending)$/i
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
