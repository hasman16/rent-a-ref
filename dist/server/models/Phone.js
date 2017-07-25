"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('phone', {
        "number": {
            type: DataTypes.STRING(64),
            allowNull: false,
            validate: {
                is: /^\d+$/
            }
        },
        description: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^(mobile|home|cell|other)$/i
            }
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
;
//# sourceMappingURL=Phone.js.map