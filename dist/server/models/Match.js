"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Match = function (sequelize, DataTypes) {
    return sequelize.define('match', {
        name: {
            type: DataTypes.STRING(64)
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        periods: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        referees: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: DataTypes.DATE
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Match;
//# sourceMappingURL=Match.js.map