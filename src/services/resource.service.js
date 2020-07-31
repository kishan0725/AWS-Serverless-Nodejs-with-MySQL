const ResourceDAO = require('../dao/resource.dao');
var lodash = require('lodash');
class ResourceService{
    async getResources(ResourceDetail) {
        const ResourceDetails = new SkillDAO();
        const pageNo = ResourceDetail.page-1;
        const pageSize = ResourceDetail.limit;
        const resources = await ResourceDetails.getSkillDetails(pageNo, pageSize);
        return resources;
        // return lodash.map(skills, (elm) => { 
        //     return lodash.pick(elm, 'id', 'skill_name', 'description'); 
        // });
    }
}

module.exports = SkillService;