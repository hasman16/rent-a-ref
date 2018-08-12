"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('image', {
        mimetype: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bucket: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        key: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
//# sourceMappingURL=Image.js.map