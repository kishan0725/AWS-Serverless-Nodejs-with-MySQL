const camelCaseUtil = require('../utils/camelcase.util');

const responseBean = (res) => {
    return response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(camelCaseUtil.camelizeKeys(res))
    }
}

module.exports.responseBean = responseBean;