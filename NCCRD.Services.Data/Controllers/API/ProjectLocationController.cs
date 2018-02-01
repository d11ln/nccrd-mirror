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
    /// Manage ProjectLocation data
    /// </summary>
    public class ProjectLocationController : ApiController
    {
        /// <summary>
        /// Get all ProjectLocation data
        /// </summary>
        /// <returns>ProjectLocation data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectLocation/GetAll")]
        public IEnumerable<ProjectLocation> GetAll()
        {
            List<ProjectLocation> data = new List<ProjectLocation>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectLocation.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectLocation by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectLocation to get</param>
        /// <returns>ProjectLocation data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectLocation/GetByID/{id}")]
        public ProjectLocation GetByID(int id)
        {
            ProjectLocation data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectLocation.FirstOrDefault(x => x.ProjectLocationId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ProjectLocation by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the ProjectLocation to get</param>
        /// <returns>ProjectLocation data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectLocation/GetByProjectID/{projectId}")]
        public ProjectLocation GetByProjectID(int projectId)
        {
            ProjectLocation data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectLocation.FirstOrDefault(x => x.ProjectId == projectId);
            }

            return data;
        }

        /// <summary>
        /// Add ProjectLocation
        /// </summary>
        /// <param name="projectLocation">The ProjectLocation to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectLocation/Add")]
        public bool Add([FromBody]ProjectLocation projectLocation)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectLocation.Count(x => x.ProjectLocationId == projectLocation.ProjectLocationId) == 0)
                {
                    //Add ProjectLocation entry
                    context.ProjectLocation.Add(projectLocation);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ProjectLocation
        /// </summary>
        /// <param name="projectLocation">ProjectLocation to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectLocation/Update")]
        public bool Update([FromBody]ProjectLocation projectLocation)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectLocation.FirstOrDefault(x => x.ProjectLocationId == projectLocation.ProjectLocationId);
                if (data != null)
                {
                    data.LocationId = projectLocation.LocationId;
                    data.ProjectId = projectLocation.ProjectId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectLocation
        /// </summary>
        /// <param name="projectLocation">ProjectLocation to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectLocation/Delete")]
        public bool Delete([FromBody]ProjectLocation projectLocation)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectLocation.FirstOrDefault(x => x.ProjectLocationId == projectLocation.ProjectLocationId);
                if (data != null)
                {
                    context.ProjectLocation.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectLocation by Id
        /// </summary>
        /// <param name="id">Id of ProjectLocation to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectLocation/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectLocation.FirstOrDefault(x => x.ProjectLocationId == id);
                if (data != null)
                {
                    context.ProjectLocation.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}