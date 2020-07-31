const SkillDAO = require('../dao/skill.dao');
var lodash = require('lodash');
class SkillService{
    async getSkills(skillDetail) {
        const SkillDetails = new SkillDAO();
        const resourceId = skillDetail.user_id;
        const pageNo = skillDetail.page-1;
        const pageSize = skillDetail.limit;
        const skills = await SkillDetails.getSkillDetails(resourceId, pageNo, pageSize);
        return lodash.map(skills, (elm) => { 
            return lodash.pick(elm, 'id', 'skill_name', 'description'); 
        });
    }
}

module.exports = SkillService;