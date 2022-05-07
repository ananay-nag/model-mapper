import { ModelTypes } from "../common";

/**
 *
 * @param model | object | any object model with { [x: string]: any; }
 * @returns | boolean | is validated or not
 */
export function isObject(model: object): boolean {
  return typeof model === "object";
}
/**
 *
 * @param v | any | value to be validate
 * @param type | string |  validate type | typeof value
 * @returns | boolean | is validated or not
 */
export function validate(v: any, type: string): boolean {
  return type === ModelTypes.ARRAY ? v instanceof Array : typeof v === type;
}
