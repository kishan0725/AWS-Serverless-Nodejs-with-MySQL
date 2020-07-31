'use strict';
const camelCaseUtil = require('../utils/camelcase.util');
const SkillService =require('../services/skill.service');

module.exports.getSkill = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const mySkills = new SkillService();
  const skills = await mySkills.getSkill(event.queryStringParameters);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(camelCaseUtil.camelCase(skills))
  };
  callback(null, response);  
};
