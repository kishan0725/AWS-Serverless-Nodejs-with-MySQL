const camCase = require('camelcase-keys');

const camelCase = async(data)=>{
    return camCase(data)
}

module.exports.camelCase = camelCase;
