/**
 *
 * @param model | object | any object model with { [x: string]: any; }
 * @returns | boolean | is validated or not
 */
export declare function isObject(model: object): boolean;
/**
 *
 * @param v | any | value to be validate
 * @param type | string |  validate type | typeof value
 * @returns | boolean | is validated or not
 */
export declare function validate(v: any, type: string): boolean;
