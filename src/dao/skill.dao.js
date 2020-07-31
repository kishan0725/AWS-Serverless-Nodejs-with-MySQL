const dbConfig = require('../config/db.config');
var skillBean = require('../beans/skill.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var userSkillBean = require('../beans/userSkill.bean')(dbConfig.sequelize, dbConfig.Sequelize);

class SkillDAO {
    async getSkillDetails(resourceId, pageNo, pageSize) {
        try{
            skillBean.hasMany(userSkillBean, {
                foreignKey: 'skill_id'
              });
            userSkillBean.belongsTo(skillBean);
            let skillLimit = pageSize;
            let skillOffset = pageNo*pageSize;

            var skillBn = await skillBean.findAll(
                {
                    limit: Number(skillLimit),
                    offset: Number(skillOffset),
                    include: [{
                                model:userSkillBean, 
                                where: {user_id: resourceId}, 
                            }],
                },
                {raw: true} 
            );
            return skillBn;
        }
        catch(error) {
            return "We couldn't get the result. "+error;
        }
    }
}

module.exports = SkillDAO;