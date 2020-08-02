const ResourceDAO = require('../dao/resource.dao');

class ResourceService{
    async getResources(ResourceDetail) {
        const ResourceDetails = new ResourceDAO();
        const pageNo = ResourceDetail.page-1;
        const pageSize = ResourceDetail.limit;
        const resources = await ResourceDetails.getResourceDetails(pageNo, pageSize);

        // get the maximum date among the list of end_date property
        function getMaxDate(obj){
            return obj.map(function(e) { return e.end_date; }).sort().reverse()[0]
        }

        // filtering the required data to be displayed in the endpoint API  
        const output = resources.map(resource => ({
            id: resource.id,
            full_name: resource.full_name,
            skills: resource.user_skills.map(item => ({
                id: item.skill_id,
                name: item.skill.skill_name
              })),
            projects: resource.resource_allocateds.map(item => ({
                id: item.project_id,
                name: item.project.project_name
              })),
            available: getMaxDate(resource.resource_allocateds)
          }) );

        return output;
    }

}

module.exports = ResourceService;