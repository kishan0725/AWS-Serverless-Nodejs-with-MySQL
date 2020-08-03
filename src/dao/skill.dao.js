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
            return "We couldn't get the result. "+error;
        }
    }
}

module.exports = SkillDAO;