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
                isIn: [
                    [
                        'u7',
                        'u8',
                        'u9',
                        'u10',
                        'u11',
                        'u12',
                        'u13',
                        'u14',
                        'u15',
                        'u16',
                        'u17',
                        'u18',
                        'u19',
                        'u23',
                        'adults'
                    ]
                ]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        periods: {
            type: DataTypes.INTEGER,
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