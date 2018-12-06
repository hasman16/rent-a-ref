"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Meeting = function (sequelize, DataTypes) {
    return sequelize.define('meeting', {
        event_name: DataTypes.STRING(64),
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timezone: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        timezone_offset: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        timezone_id: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: ''
        },
        timezone_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: ''
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
        kids_games: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        teen_games: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        adult_games: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        kids_game_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        teen_game_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        adult_game_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        charge_id: DataTypes.STRING(128),
        order_id: DataTypes.STRING(128),
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
exports.default = Meeting;
//# sourceMappingURL=Meeting.js.map