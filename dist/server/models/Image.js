"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define('image', {
        image: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true // use underscore instead of camelCase.
    });
}
exports.default = default_1;
//# sourceMappingURL=Image.js.map