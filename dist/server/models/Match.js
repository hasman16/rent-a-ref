"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Match = function (sequelize, DataTypes) {
    return sequelize.define('match', {
        match_name: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        venue_name: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: 'none',
            validate: {
                isIn: [['none', 'pending', 'played', 'cancelled', 'active']]
            }
        },
        age: {
            type: DataTypes.STRING(32),
            allowNull: true,
            validate: {
                isIn: [['kids', 'teens', 'adults']]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timezone: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        timezone_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: ''
        },
        referees: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Match;
//# sourceMappingURL=Match.js.map