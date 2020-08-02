'use strict';

const response = require('../beans/response.bean');
const ResourceService =require('../services/resource.service');

module.exports.getResources = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const myResources = new ResourceService();
  const resources = await myResources.getResources(event.queryStringParameters);
  callback(null, response.responseBean(resources));   
  
};
  
