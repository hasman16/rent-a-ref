"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = function (sequelize, DataTypes) {
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
        authorization: DataTypes.INTEGER,
        authorized_by: DataTypes.INTEGER
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Person;
//# sourceMappingURL=Person.js.map