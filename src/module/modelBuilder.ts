import { isObject, validate } from "../utils/index";
import { ModelDefaultValues, ModelTypes } from "../common";
import { IValidateModel } from "../common/common.interface";

/**
 *
 * @param vm | IValidateModel | value model
 * @param mb | IValidateModel | model builder
 * @param buildModel | IValidateModel | new model builder
 * @returns | IValidateModel | new model builder
 */
export function ModelBuilder(vm: IValidateModel, mb: IValidateModel, forceValidate: Boolean = false, buildModel: IValidateModel = Object.assign({}, mb)): IValidateModel {
  if (isObject(mb))
    Object.keys(mb).forEach((k: string) => {
      if (isObject(mb[k]) && mb[k].hasOwnProperty("key"))
        if ((vm[mb[k].key] !== null || vm[mb[k].key] !== undefined) && mb[k].validate) {
          valueValidate(mb, vm, buildModel, k, forceValidate);
        } else if (vm[mb[k].key]) {
          buildModel[k] = vm[mb[k].key];
        } else buildModel[k] = null;
      else {
        delete buildModel[k]["default"];
        ModelBuilder(vm, mb[k], forceValidate, buildModel[k]);
      }
    });
  return buildModel;
}

function valueValidate(mb: IValidateModel, vm: IValidateModel, buildModel: IValidateModel, k: string, forceValidate: Boolean) {
  switch (typeof mb[k].validate) {
    case ModelTypes.FUNCTION:
      if (mb[k].validate(vm[mb[k].key])) {
        buildModel[k] = vm[mb[k].key];
      } else checkDefaults(mb, buildModel, k, forceValidate);
      break;
    case ModelTypes.STRING:
      if (validate(vm[mb[k].key], mb[k].validate)) {
        buildModel[k] = vm[mb[k].key];
      } else checkDefaults(mb, buildModel, k, forceValidate);
      break;
  }
}

function checkDefaults(mb: IValidateModel, buildModel: IValidateModel, k: string, forceValidate: Boolean) {
  if (mb[k].hasOwnProperty("default")) buildModel[k] = mb[k].default;
  else if (!forceValidate)
    switch (mb[k].validate as string) {
      case ModelTypes.ARRAY:
        buildModel[k] = ModelDefaultValues.ARRAY;
        break;
      case ModelTypes.STRING:
        buildModel[k] = ModelDefaultValues.STRING;
        break;
      case ModelTypes.OBJECT:
        buildModel[k] = ModelDefaultValues.OBJECT;
        break;
      case ModelTypes.NUMBER:
        buildModel[k] = ModelDefaultValues.NUMBER;
        break;
      case ModelTypes.BOOLEAN:
        buildModel[k] = ModelDefaultValues.BOOLEAN;
        break;
      default:
        buildModel[k] = null;
    }
  else throw new Error(`custom function failed to validate value`);
}
