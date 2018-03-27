"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = function (sequelize, DataTypes) {
    return sequelize.define('game', {
        name: DataTypes.STRING(64),
        date: DataTypes.DATE,
        ages: DataTypes.STRING(64),
        duration: DataTypes.INTEGER,
        referees: DataTypes.INTEGER,
        pay: DataTypes.INTEGER
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Game;
//# sourceMappingURL=Game.js.map