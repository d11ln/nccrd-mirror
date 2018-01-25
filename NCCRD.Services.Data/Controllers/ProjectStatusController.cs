using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
{
    /// <summary>
    /// Manage ProjectStatus data
    /// </summary>
    public class ProjectStatusController : ApiController
    {
        /// <summary>
        /// Get all ProjectStatus data
        /// </summary>
        /// <returns>ProjectStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectStatus/GetAll")]
        public IEnumerable<ProjectStatus> GetAll()
        {
            List<ProjectStatus> data = new List<ProjectStatus>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectStatus.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectStatus by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectStatus to get</param>
        /// <returns>ProjectStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectStatus/GetByID/{id}")]
        public ProjectStatus GetByID(int id)
        {
            ProjectStatus data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == id);
            }

            return data;
        }

        /// <summary>
        /// Add ProjectStatus
        /// </summary>
        /// <param name="projectStatus">The ProjectStatus to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectStatus/Add")]
        public bool Add([FromBody]ProjectStatus projectStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectStatus.Count(x => x.ProjectStatusId == projectStatus.ProjectStatusId) == 0)
                {
                    //Add ProjectStatus entry
                    context.ProjectStatus.Add(projectStatus);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ProjectStatus
        /// </summary>
        /// <param name="projectStatus">ProjectStatus to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectStatus/Update")]
        public bool Update([FromBody]ProjectStatus projectStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == projectStatus.ProjectStatusId);
                if (data != null)
                {
                    data.Value = projectStatus.Value;
                    data.Description = projectStatus.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectStatus
        /// </summary>
        /// <param name="projectStatus">ProjectStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectStatus/Delete")]
        public bool Delete([FromBody]ProjectStatus projectStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == projectStatus.ProjectStatusId);
                if (data != null)
                {
                    context.ProjectStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectStatus by Id
        /// </summary>
        /// <param name="id">Id of ProjectStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectStatus/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == id);
                if (data != null)
                {
                    context.ProjectStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}