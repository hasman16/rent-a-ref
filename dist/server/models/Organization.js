"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Organization = function (sequelize, DataTypes) {
    return sequelize.define('organization', {
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Organization;
//# sourceMappingURL=Organization.js.map