'use strict';

const response = require('../beans/response.bean');
const SkillService =require('../services/skill.service');
const DataType = require('../constants/datatypes.constant');

module.exports.getSkills = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const mySkills = new SkillService();
  const skills = await mySkills.getSkills(event.queryStringParameters);

  // error or success message will have the type of string
  if(typeof(skills)==DataType.string) {
    callback(null, response.responseBean(skills));  
  }
  
  callback(null, response.responseBean(skills, skills.page_count));   
  
};

module.exports.addSkill = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const createSkill = new SkillService();
  const skills = await createSkill.addSkill(JSON.parse(event.body));
  callback(null, response.responseBean(skills));

}