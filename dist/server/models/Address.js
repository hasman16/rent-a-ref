"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('address', {
        street1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street2: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        state: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        zip: {
            type: DataTypes.STRING(16),
            allowNull: false,
            validate: {
                is: /^\d{5}(-\d{4})?$/
            }
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
;
//# sourceMappingURL=Address.js.map