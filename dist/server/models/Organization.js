"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Organization = function (sequelize, DataTypes) {
    return sequelize.define('organization', {
        name: DataTypes.STRING(64)
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Organization;
//# sourceMappingURL=Organization.js.map