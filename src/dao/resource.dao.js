const dbConfig = require('../config/db.config');
var userBean = require('../beans/user.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var skillBean = require('../beans/skill.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var userSkillBean = require('../beans/userSkill.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var resourceAllocatedBean = require('../beans/resourceAllocated.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var projectBean = require('../beans/project.bean')(dbConfig.sequelize, dbConfig.Sequelize);
var Sequelize = require('sequelize');

class ResourceDAO {
    async getResourceDetails(pageNo, pageSize, unassigned) {

        // sort by full name of the resource
        var orderBy = [
            ['first_name', 'ASC'],
            ['last_name', 'ASC']
        ]
        

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

            if(!unassigned) {
                // to get the count of all resources
                var resourceBnCount = await userBean.count({ where: { user_type_id: 2 } });

                // to get the details of all resources
                var resourceBn = await userBean.findAll({
                    order: orderBy,
                    limit: Number(skillLimit),
                    offset: Number(skillOffset),
                    attributes: [
                        'id', 
                        [Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),'full_name'],
                        'first_name',
                        'last_name'
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
                            required: false, // results in both allocated and unallocated resources
                            include: [{
                                attributes: ['project_name','is_deleted'],
                                model: projectBean
                            }]
                        }
                    ],
                    where: {
                        user_type_id: 2
                    }
                });
            }
            else {

                // STEPS TO FIND UNALLOCATED RESOURCES ONLY
                // 1. Find the IDs of allocated resources
                // 2. Get the count of unallocated resources (IDs of all resources - IDs of allocated resources)
                // 3. Get the details of unallocated resources


                // 1. to get the ID of allocated resources
                var resourceIds = await resourceAllocatedBean.count({
                    attributes: ['user_id'],
                    group: ['user_id']
                })
                .then((users) => users.map(user => user.user_id));

                // 2. to get the count of unallocated resources
                var resourceBnCount = await userBean.count({
                    where: {
                        [Sequelize.Op.and]: [{
                            id: { [Sequelize.Op.notIn]: resourceIds},
                            user_type_id: 2
                        }]
                    }
                });

                // 3. to get the details of unassigned resources
                var resourceBn = await userBean.findAll({
                    order: orderBy,
                    limit: Number(skillLimit),
                    offset: Number(skillOffset),
                    attributes: [
                        'id', 
                        [Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),'full_name'],
                        'first_name',
                        'last_name'
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
                    ],
                    where: {
                        [Sequelize.Op.and]: [{
                            id: { [Sequelize.Op.notIn]: resourceIds},
                            user_type_id: 2
                        }]
                    }
                });

            }

            // returns both query result and count
            return [
                // filtering the required values from the 'resourceBn' as we don't want its metadata
                await resourceBn.map((res) => {
                    return res.dataValues;
                }), 
                resourceBnCount
            ]; 


        } catch(error) {
            return "Sorry! We couldn't get the result. " + error;
        }
    }
}

module.exports = ResourceDAO;