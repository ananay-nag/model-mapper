import { IValidateModel } from "../common/common.interface";
/**
 *
 * @param vm | IValidateModel | value model
 * @param mb | IValidateModel | model builder
 * @param buildModel | IValidateModel | new model builder
 * @returns | IValidateModel | new model builder
 */
export declare function ModelBuilder(vm: IValidateModel, mb: IValidateModel, buildModel?: IValidateModel): IValidateModel;
