"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('area', {
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]]
            }
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
            allowNull: true,
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
//# sourceMappingURL=Area.js.map