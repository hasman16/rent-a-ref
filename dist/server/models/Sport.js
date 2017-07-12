"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sport = function (sequelize, DataTypes) {
    return sequelize.define('sport', {
        name: DataTypes.STRING(64),
        duration: DataTypes.INTEGER,
        periods: DataTypes.INTEGER,
        referees: DataTypes.INTEGER
    }, {
        paranoid: true,
        underscored: true //use underscore instead of camelCase.
    });
};
exports.default = Sport;
//# sourceMappingURL=Sport.js.map