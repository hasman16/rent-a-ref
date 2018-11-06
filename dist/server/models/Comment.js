"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('comment', {
        content: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(64)
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
//# sourceMappingURL=Comment.js.map