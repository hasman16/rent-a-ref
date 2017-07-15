"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING(64),
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        authorization: DataTypes.INTEGER
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
;
//# sourceMappingURL=User.js.map