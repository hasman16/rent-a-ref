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
    can_referee: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'no',
      validate: {
        is: /^(no|pending|active|suspended)$/i
      }
    },
    can_organize: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'no',
      validate: {
        is: /^(no|pending|active|suspended)$/i
      }
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        is: /^(pending|active|suspended)$/i
      }
    }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    });
};
