const dbConfig = require('../config/db.config');
var userBean = require('../beans/user.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var skillBean = require('../beans/skill.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var userSkillBean = require('../beans/userSkill.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var resourceAllocatedBean = require('../beans/resourceAllocated.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var projectBean = require('../beans/project.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var Sequelize = require('sequelize');

class ResourceDAO {
    async getResourceDetails(pageNo, pageSize) {

        try {
            // defining associations among the beans
            userBean.hasMany(userSkillBean, {
                foreignKey: 'user_id'
              });
            userSkillBean.belongsTo(userBean);
            skillBean.hasMany(userSkillBean,{
                foreignKey: 'skill_id'
              });
            userSkillBean.belongsTo(skillBean);
            userBean.hasMany(resourceAllocatedBean,{
                foreignKey: 'user_id'
              });
            resourceAllocatedBean.belongsTo(userBean);
            projectBean.hasMany(resourceAllocatedBean,{
                foreignKey: 'project_id'
              });
            resourceAllocatedBean.belongsTo(projectBean);

            let skillLimit = pageSize;
            let skillOffset = pageNo*pageSize;

            var resourceBn = await userBean.findAll(
                {
                    limit: Number(skillLimit),
                    offset: Number(skillOffset),
                    attributes: [
                        'id', 
                        [Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),'full_name'],
                    ],
                    include: [
                        {
                            attributes: ['skill_id'],
                            model:userSkillBean,
                            include: [{
                                attributes: ['skill_name'],
                                model: skillBean
                            }]
                        }, 
                        {
                            attributes: ['project_id', 'end_date'],
                            model: resourceAllocatedBean,
                            where: {is_active: 1},
                            include: [{
                                attributes: ['project_name'],
                                model: projectBean
                            }]
                        }
                    ],
                    where: {
                        user_type_id: 2
                    }
                });
            
            // filtering the required values from the 'resourceBn' as we don't want its metadata
            return await resourceBn.map((res) => {
                return res.dataValues;
            }) 


        } catch(error) {
            return "Sorry! We couldn't get the result. " + error;
        }
    }
}

module.exports = ResourceDAO;