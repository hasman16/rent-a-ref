"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareFields(fieldName1, fieldName2) {
    return function (c) {
        var field1 = c.get(fieldName1);
        var field2 = c.get(fieldName2);
        if (field1.value !== field2.value) {
            return { compareFields: true };
        }
        return null;
    };
}
exports.compareFields = compareFields;
//# sourceMappingURL=compareFields.js.map