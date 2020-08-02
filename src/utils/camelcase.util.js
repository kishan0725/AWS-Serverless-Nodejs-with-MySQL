const camelCase = require('lodash').camelCase;

// camelizeKeys function converts the property names to camelCase, works for nested property names too.
const camelizeKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => camelizeKeys(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: camelizeKeys(obj[key]),
        }),
        {},
      );
    }
    return obj;
};

module.exports.camelizeKeys = camelizeKeys;
