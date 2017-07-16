"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sport = function (sequelize, DataTypes) {
    return sequelize.define('sport', {
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        periods: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        referees: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Sport;
//# sourceMappingURL=Sport.js.map