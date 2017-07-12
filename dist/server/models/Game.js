"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = function (sequelize, DataTypes) {
    return sequelize.define('game', {
        name: DataTypes.STRING(64),
        referees: DataTypes.INTEGER
    }, {
        paranoid: true,
        underscored: true //use underscore instead of camelCase.
    });
};
exports.default = Game;
//# sourceMappingURL=Game.js.map