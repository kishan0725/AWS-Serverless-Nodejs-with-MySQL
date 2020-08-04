'use strict';

const response = require('../beans/response.bean');
const ResourceService =require('../services/resource.service');

module.exports.getResources = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const myResources = new ResourceService();
  const resources = await myResources.getResources(event.queryStringParameters);

  // exceptions will have the type of string
  if(typeof(resources)=="string") {
    callback(null, response.responseBean(resources));  
  }
  callback(null, response.responseBean(resources,resources.page_count));   
  
};