using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage ProjectRegion data
    /// </summary>
    public class ProjectRegionController : ApiController
    {
        /// <summary>
        /// Get all ProjectRegion data
        /// </summary>
        /// <returns>ProjectRegion data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectRegion/GetAll")]
        public IEnumerable<ProjectRegion> GetAll()
        {
            List<ProjectRegion> data = new List<ProjectRegion>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectRegion.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectRegion by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectRegion to get</param>
        /// <returns>ProjectRegion data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectRegion/GetByID/{id}")]
        public ProjectRegion GetByID(int id)
        {
            ProjectRegion data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectRegion.FirstOrDefault(x => x.ProjectRegionId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ProjectRegion by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the ProjectRegion to get</param>
        /// <returns>ProjectRegion data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectRegion/GetByProjectID/{projectId}")]
        public ProjectRegion GetByProjectID(int projectId)
        {
            ProjectRegion data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectRegion.FirstOrDefault(x => x.ProjectId == projectId);
            }

            return data;
        }

        /*/// <summary>
        /// Add ProjectRegion
        /// </summary>
        /// <param name="projectRegion">The ProjectRegion to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectRegion/Add")]
        public bool Add([FromBody]ProjectRegion projectRegion)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectRegion.Count(x => x.ProjectRegionId == projectRegion.ProjectRegionId) == 0)
                {
                    //Add ProjectRegion entry
                    context.ProjectRegion.Add(projectRegion);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update ProjectRegion
        /// </summary>
        /// <param name="projectRegion">ProjectRegion to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectRegion/Update")]
        public bool Update([FromBody]ProjectRegion projectRegion)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectRegion.FirstOrDefault(x => x.ProjectRegionId == projectRegion.ProjectRegionId);
                if (data != null)
                {
                    data.RegionId = projectRegion.RegionId;
                    data.ProjectId = projectRegion.ProjectId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete ProjectRegion
        /// </summary>
        /// <param name="projectRegion">ProjectRegion to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectRegion/Delete")]
        public bool Delete([FromBody]ProjectRegion projectRegion)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectRegion.FirstOrDefault(x => x.ProjectRegionId == projectRegion.ProjectRegionId);
                if (data != null)
                {
                    context.ProjectRegion.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete ProjectRegion by Id
        /// </summary>
        /// <param name="id">Id of ProjectRegion to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectRegion/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectRegion.FirstOrDefault(x => x.ProjectRegionId == id);
                if (data != null)
                {
                    context.ProjectRegion.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}