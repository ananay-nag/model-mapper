let { utility } = require("../utils");
module.exports.modelBuilder = modelBuilder;
function modelBuilder(vb, mm, buildModel = Object.assign({}, mm)) {
  if (utility.isObject(mm))
    Object.keys(mm).forEach((k) => {
      if (utility.isObject(mm[k]) && mm[k].hasOwnProperty("key")) {
        if ((vb[mm[k].key] !== null || vb[mm[k].key] !== undefined) && mm[k].validate) {
          if (utility.validate(vb[mm[k].key], mm[k].validate)) {
            buildModel[k] = vb[mm[k].key];
          } else if (mm[k].hasOwnProperty("default")) {
            buildModel[k] = mm[k].default;
          }
        } else if (vb[mm[k].key]) {
          buildModel[k] = vb[mm[k].key];
        } else {
          buildModel[k] = undefined;
        }
      } else {
        delete buildModel[k]["default"];
        modelBuilder(vb, mm[k], buildModel[k]);
      }
    });
  return buildModel;
}
