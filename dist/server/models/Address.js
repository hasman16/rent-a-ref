"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('address', {
        line1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        line2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING(16),
            allowNull: false,
            validate: {
                is: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/
            }
        },
        notes: {
            type: DataTypes.STRING(128)
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
//# sourceMappingURL=Address.js.map