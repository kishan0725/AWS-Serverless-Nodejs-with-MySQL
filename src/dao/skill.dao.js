const dbConfig = require('../config/db.config');
var skillBean = require('../beans/skill.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var userSkillBean = require('../beans/userSkill.bean')(dbConfig.sequelize, dbConfig.Sequelize);

class SkillDAO {

    async getSkillDetails(userId, pageNo, pageSize) {
        try{
            skillBean.hasMany(userSkillBean, {
                foreignKey: 'skill_id'
            });
            userSkillBean.belongsTo(skillBean);
            let skillLimit = pageSize;
            let skillOffset = pageNo*pageSize;

            // to get the count of skills for a given user_id
            var skillBnCount = await skillBean.count({ 
                include: [{
                    model:userSkillBean, 
                    where: {user_id: userId}, 
                }], 
            })

            // to get the details of the skills for a given user_id
            var skillBn = await skillBean.findAll(
                {
                    limit: Number(skillLimit),
                    offset: Number(skillOffset),
                    include: [{
                        model:userSkillBean, 
                        where: {user_id: userId}, 
                    }],
                },
                {raw: true} 
            );

            // returns both query result and count
            return [skillBn, skillBnCount];
        }
        catch(error) {
            return "Sorry! We couldn't get the result. " + error;
        }
    }

    async addSkillDetails(user_type, user_id, skill_name, skill_desc) {

        try {
            // making approval_status 1 for managers
            if(user_type==1){
                var approval_status = 1;
            }
            // making approval_status 0 for resources
            else {
                var approval_status = 0;
            }
            console.log(approval_status);
            const addedSkill = await skillBean.create({
                skill_name: skill_name,
                approval_status: approval_status,
                description: skill_desc,
                skill_requested_by: user_id
            });

            return "Skill added successfully!";
        }
        catch(error) {
            return "Sorry! We couldn't add the skill. " + error;
        }
    }
}

module.exports = SkillDAO;