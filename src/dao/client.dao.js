const camelCaseUtil = require('../util/camelcase.util');
const dbConfig = require('../config/db.config');
const mysql = require('serverless-mysql')({
    config: dbConfig
});

class ClientDAO {
    async getClientDetails(clientId) {
        let results = await mysql.query(`SELECT * FROM client where id=${clientId}`);
        await mysql.end();
        if (results) {
            console.log(results);
            return camelCaseUtil.camelCase(results);
        }
        else {
            return "Incorrect query or table";
        }
    }
}

module.exports = ClientDAO;

// class ClientDAO {
//     public getClientDetails = async(clientId, context, callback) => {
//         context.callbackWaitsForEmptyEventLoop = false;
//         let results = await mysql.query(`SELECT * FROM client where id=${clientId}`);
//         await mysql.end();
//         if (results) {
//             const camCase = await camelCaseModule.camelCase(results);
//             return callback(null,{
//                 statusCode: 200,
//                 headers: {
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Credentials': true,
//                 },
//                 body: {
//                     message: camCase
//                 }
//             })
//         }
//         else {
//             return callback('error', {
//                 statusCode: 400,
//                  headers: {
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Credentials': true,
//                 },
//                 body: {
//                     message: 'No functions found.'
//                 },
//             })
//         }
//     }
// }