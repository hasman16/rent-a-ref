"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Match = function (sequelize, DataTypes) {
    return sequelize.define('match', {
        venue_name: {
            type: DataTypes.STRING(64)
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
            allowNull: false,
            validate: {
                isIn: [['kids', 'teens', 'adults']]
            }
        },
        match_date: {
            type: DataTypes.DATE,
            allowNull: false
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