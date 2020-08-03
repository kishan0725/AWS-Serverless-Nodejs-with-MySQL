const SkillDAO = require('../dao/skill.dao');

class SkillService{
    async getSkills(skillDetail) {
        const SkillDetails = new SkillDAO();
        const userId = skillDetail.user_id;
        const pageNo = skillDetail.page-1;
        const pageSize = skillDetail.limit;
        const skillsResponse = await SkillDetails.getSkillDetails(userId, pageNo, pageSize);
        const skills = skillsResponse[0];
        const skillsCount = skillsResponse[1];
        
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
}

module.exports = SkillService;