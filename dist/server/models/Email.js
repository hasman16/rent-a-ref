"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('email', {
        to: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        from: {
            type: DataTypes.STRING(128),
        },
        bcc: {
            type: DataTypes.STRING(128)
        },
        subject: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
;
//# sourceMappingURL=Email.js.map