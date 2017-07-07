
const Cat = function(sequelize, DataTypes) {
    return sequelize.define('cat', {
        name: DataTypes.STRING(64),
        weight: DataTypes.INTEGER,
        age: DataTypes.STRING
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};

export default Cat;
