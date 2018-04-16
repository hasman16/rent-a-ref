"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = function (sequelize, DataTypes) {
    return sequelize.define('game', {
        event_name: DataTypes.STRING(64),
        event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        event_type: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: '',
            validate: {
                isIn: [['league', 'tournament', 'oneoff']]
            }
        },
        venue_name: DataTypes.STRING(64),
        kids_referees: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        teens_referees: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        adults_referees: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        kids_ref_pay: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        teens_ref_pay: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        adults_ref_pay: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: 'none',
            validate: {
                isIn: [['none', 'pending', 'paid', 'cancelled', 'active']]
            }
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Game;
//# sourceMappingURL=Game.js.map