"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const common_1 = require("../common");
/**
 *
 * @param vm | IValidateModel | value model
 * @param mb | IValidateModel | model builder
 * @param buildModel | IValidateModel | new model builder
 * @returns | IValidateModel | new model builder
 */
function ModelBuilder(vm, mb, buildModel = Object.assign({}, mb)) {
    if (index_1.isObject(mb))
        Object.keys(mb).forEach((k) => {
            if (index_1.isObject(mb[k]) && mb[k].hasOwnProperty("key"))
                if ((vm[mb[k].key] !== null || vm[mb[k].key] !== undefined) && mb[k].validate)
                    if (index_1.validate(vm[mb[k].key], mb[k].validate))
                        buildModel[k] = vm[mb[k].key];
                    else if (mb[k].hasOwnProperty("default"))
                        buildModel[k] = mb[k].default;
                    else
                        switch (mb[k].validate) {
                            case common_1.ModelTypes.ARRAY:
                                buildModel[k] = common_1.ModelDefaultValues.ARRAY;
                                break;
                            case common_1.ModelTypes.STRING:
                                buildModel[k] = common_1.ModelDefaultValues.STRING;
                                break;
                            case common_1.ModelTypes.OBJECT:
                                buildModel[k] = common_1.ModelDefaultValues.OBJECT;
                                break;
                            case common_1.ModelTypes.NUMBER:
                                buildModel[k] = common_1.ModelDefaultValues.NUMBER;
                                break;
                            case common_1.ModelTypes.BOOLEAN:
                                buildModel[k] = common_1.ModelDefaultValues.BOOLEAN;
                                break;
                        }
                else if (vm[mb[k].key])
                    buildModel[k] = vm[mb[k].key];
                else
                    buildModel[k] = null;
            else {
                delete buildModel[k]["default"];
                ModelBuilder(vm, mb[k], buildModel[k]);
            }
        });
    return buildModel;
}
exports.ModelBuilder = ModelBuilder;
