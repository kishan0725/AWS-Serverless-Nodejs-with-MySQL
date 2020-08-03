const camelCaseUtil = require('../utils/camelcase.util');

const responseBean = (res, page_count) => {
    camel_res = camelCaseUtil.camelizeKeys({
        result:res,
        page_count:page_count
    })
    return response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(camel_res, null, 3)
    }
}

module.exports.responseBean = responseBean;