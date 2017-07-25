"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('phone', {
        "number": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^\d{5}(-\d{4})?$/
            }
        },
        phone: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
;
//# sourceMappingURL=Phone.js.map