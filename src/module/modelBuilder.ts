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
export function ModelBuilder(vm: IValidateModel, mb: IValidateModel, buildModel: IValidateModel = Object.assign({}, mb)): IValidateModel {
  if (isObject(mb))
    Object.keys(mb).forEach((k: string) => {
      if (isObject(mb[k]) && mb[k].hasOwnProperty("key"))
        if ((vm[mb[k].key] !== null || vm[mb[k].key] !== undefined) && mb[k].validate)
          if (validate(vm[mb[k].key], mb[k].validate)) buildModel[k] = vm[mb[k].key];
          else if (mb[k].hasOwnProperty("default")) buildModel[k] = mb[k].default;
          else
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
            }
        else if (vm[mb[k].key]) buildModel[k] = vm[mb[k].key];
        else buildModel[k] = null;
      else {
        delete buildModel[k]["default"];
        ModelBuilder(vm, mb[k], buildModel[k]);
      }
    });
  return buildModel;
}
