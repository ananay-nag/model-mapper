let { types } = require("../common/types");
const utility = {
  isObject,
  validate,
};
module.exports.utility = utility;

function isObject(object) {
  return typeof object === "object";
}
function validate(v, type) {
  return type === types.ARRAY ? v instanceof Array : typeof v === type;
}
