const ResourceDAO = require('../dao/resource.dao');

class ResourceService{
    async getResources(ResourceDetail) {
        const ResourceDetails = new ResourceDAO();
        const pageNo = ResourceDetail.page-1;
        const pageSize = ResourceDetail.limit;
        const resourcesResponse = await ResourceDetails.getResourceDetails(pageNo, pageSize);
        const resources = resourcesResponse[0];
        const resourcesCount = resourcesResponse[1];
        
        const page_count = (resourcesCount/pageSize > 1)?(Math.ceil(resourcesCount/pageSize)):1;

        // get the maximum date among the list of end_date property
        function getMaxDate(obj){
            return obj.map(function(e) { return e.end_date; }).sort().reverse()[0]
        }

        // filtering the required data to be displayed in the endpoint API  
        var output = resources.map(resource => ({
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

          output['page_count']= page_count;

        return output;
    }

}

module.exports = ResourceService;