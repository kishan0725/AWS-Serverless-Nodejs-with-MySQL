const ResourceDAO = require('../dao/resource.dao');

class ResourceService{
    async getResources(ResourceDetail) {
        const ResourceDetails = new ResourceDAO();
        const pageNo = ResourceDetail.page-1;
        const pageSize = ResourceDetail.limit;
        const unassigned = ResourceDetail.unassigned;
        const resourcesResponse = await ResourceDetails.getResourceDetails(pageNo, pageSize, unassigned);
        
        // exceptions will have the type of string
        if(typeof(resourcesResponse)=="string") {
          return resourcesResponse;
        }
        const resources = resourcesResponse[0];
        const resourcesCount = resourcesResponse[1];
        
        const page_count = (resourcesCount/pageSize > 1)?(Math.ceil(resourcesCount/pageSize)):1;

        // get the maximum date among the list of end_date property
        function getMaxDate(obj){
          if(obj && obj.length != 0)
            return obj.map(function(e) { return e.end_date; }).sort().reverse()[0];
          else
            return "Always";
        }
        // filtering the required data to be displayed in the endpoint API  
        var output = resources.map(resource => ({
            id: resource.id,
            full_name: resource.full_name,
            skills: resource.user_skills.map(item => ({
                id: item.skill_id,
                name: item.skill.skill_name
              })),
            // check  if there exist resource_allocated as the unallocated resources don't have resource_allocated property
            projects: ((resource.resource_allocateds)?resource.resource_allocateds.map(item => ({
                id: item.project_id,
                name: item.project.project_name,
                is_deleted: item.project.is_deleted
              })):"Not Assigned"),
            available: ((resource.resource_allocateds)?getMaxDate(resource.resource_allocateds):"Always")
          }) );

          output['page_count']= page_count;

        return output;
    }

}

module.exports = ResourceService;