'use strict';
const ClientService =require('../services/client.service');

module.exports.getClient = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const myClient = new ClientService();
  const client = await myClient.getClient(event.queryStringParameters);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      client: client
    }),
  };
  callback(null, response);
};
