"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var PersonCtrl = (function (_super) {
    __extends(PersonCtrl, _super);
    function PersonCtrl(Person) {
        var _this = _super.call(this) || this;
        _this.model = null;
        _this.model = Person;
        return _this;
    }
    return PersonCtrl;
}(base_1.default));
exports.default = PersonCtrl;
//# sourceMappingURL=person.js.map