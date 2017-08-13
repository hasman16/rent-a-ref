"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = function (sequelize, DataTypes) {
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
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Person;
//# sourceMappingURL=Person.js.map