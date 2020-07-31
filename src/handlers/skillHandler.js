'use strict';

const response = require('../beans/response.bean');
const SkillService =require('../services/skill.service');

module.exports.getSkills = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const mySkills = new SkillService();
  const skills = await mySkills.getSkills(event.queryStringParameters);
  callback(null, response.responseBean(skills));   
  
};
