"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('lock', {
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        attempts: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        passcode: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
;
//# sourceMappingURL=Lock.js.map