const SkillDAO = require('../dao/skill.dao');
var _ = require('lodash');
class SkillService{
    async getSkill(skillDetail) {
        const SkillDetails = new SkillDAO();
        const resourceId = skillDetail.user_id;
        const pageNo = skillDetail.page-1;
        const pageSize = skillDetail.limit;
        const skills = await SkillDetails.getSkillDetails(resourceId, pageNo, pageSize);
        return _.map(skills, (elm) => { 
            return _.pick(elm, 'id', 'skill_name', 'description'); 
        });
    }
}

module.exports = SkillService;