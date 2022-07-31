"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.isObject = void 0;
const common_1 = require("../common");
/**
 *
 * @param model | object | any object model with { [x: string]: any; }
 * @returns | boolean | is validated or not
 */
function isObject(model) {
    return typeof model === "object";
}
exports.isObject = isObject;
/**
 *
 * @param v | any | value to be validate
 * @param type | string |  validate type | typeof value
 * @returns | boolean | is validated or not
 */
function validate(v, type) {
    return type === common_1.ModelTypes.ARRAY ? v instanceof Array : typeof v === type;
}
exports.validate = validate;
