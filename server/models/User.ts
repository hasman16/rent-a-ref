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
        isIn: [ ['no', 'pending', 'active', 'suspended'] ]
      }
    },
    can_organize: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'no',
      validate: {
        isIn: [ ['no', 'pending', 'active', 'suspended'] ]
      }
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'no',
      validate: {
        isIn: [ ['no', 'pending', 'active', 'suspended', 'locked', 'banned'] ]
      }
    }
  }, {
      paranoid: true, // mark as deleted but do not delete
      underscored: true // use underscore instead of camelCase.
    });
}
