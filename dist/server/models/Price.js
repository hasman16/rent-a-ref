"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Price = function (sequelize, DataTypes) {
    return sequelize.define('price', {
        description: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: '',
            validate: {
                isIn: [['kids', 'teens', 'adults']]
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
};
exports.default = Price;
//# sourceMappingURL=Price.js.map