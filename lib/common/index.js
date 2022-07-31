"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDefaultValues = exports.ModelTypes = void 0;
exports.ModelTypes = {
    ARRAY: "array",
    OBJECT: "object",
    NUMBER: "number",
    STRING: "string",
    BOOLEAN: "boolean",
    FUNCTION: "function",
};
exports.ModelDefaultValues = {
    ARRAY: [],
    OBJECT: {},
    NUMBER: 0,
    STRING: "",
    BOOLEAN: false,
    FUNCTION: () => { },
};
