const SkillDAO = require('../dao/skill.dao');
const DataType = require('../constants/datatypes.constant');

class SkillService{
    async getSkills(skillDetail) {
        const SkillDetails = new SkillDAO();
        const userId = skillDetail.user_id;
        const pageNo = skillDetail.page-1;
        const pageSize = skillDetail.limit;
        const skillsResponse = await SkillDetails.getSkillDetails(userId, pageNo, pageSize);

        // error and success message will have the type of string
        if(typeof(skillsResponse)==DataType.string) {
            return skillsResponse;
        }
        const skills = skillsResponse[0];
        const skillsCount = skillsResponse[1];
        
        // rounds the page count UPWARDS to the nearest integer, if the page count exceeds 1
        const page_count = (skillsCount/pageSize > 1)?(Math.ceil(skillsCount/pageSize)):1;

        // filtering the required data to be displayed in the endpoint API  
        var output = skills.map(skill => ({
            id: skill.id,
            full_name: skill.skill_name,
            description: skill.description
        }) );

        output['page_count']= page_count;

        return output;
    }

    async addSkill(req) {
        const SkillDetails = new SkillDAO();
        const user_type = Number(req.user_type);
        const user_id = Number(req.user_id);
        const skill_name = req.name;
        const skill_desc = req.description;
        const skillsResponse = await SkillDetails.addSkillDetails(user_type, user_id, skill_name, skill_desc);
        return skillsResponse;
    }
}

module.exports = SkillService;