"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('customer', {
        email: {
            type: DataTypes.STRING(124),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        stripe_id: {
            type: DataTypes.STRING(124),
            unique: true,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
//# sourceMappingURL=Customer.js.map