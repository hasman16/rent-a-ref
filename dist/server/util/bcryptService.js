"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
function genSalt(length) {
    if (length === void 0) { length = 10; }
    return bcrypt.genSalt(length);
}
exports.genSalt = genSalt;
;
function hash(value) {
    return bcrypt.hash(value, 10);
}
exports.hash = hash;
;
function compare(value1, hash) {
    return bcrypt.compare(value1, hash);
}
exports.compare = compare;
;
//# sourceMappingURL=bcryptService.js.map