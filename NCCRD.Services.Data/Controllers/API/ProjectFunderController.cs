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
    /// Manage ProjectFunder data
    /// </summary>
    public class ProjectFunderController : ApiController
    {
        /// <summary>
        /// Get all ProjectFunder data
        /// </summary>
        /// <returns>ProjectFunder data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectFunder/GetAll")]
        public IEnumerable<ProjectFunder> GetAll()
        {
            List<ProjectFunder> data = new List<ProjectFunder>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectFunder.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectFunder by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectFunder to get</param>
        /// <returns>ProjectFunder data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectFunder/GetByID/{id}")]
        public ProjectFunder GetByID(int id)
        {
            ProjectFunder data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectFunder.FirstOrDefault(x => x.ProjectFunderId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ProjectFunder by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the ProjectFunder to get</param>
        /// <returns>ProjectFunder data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectFunder/GetByProjectID/{projectId}")]
        public ProjectFunder GetByProjectID(int projectId)
        {
            ProjectFunder data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectFunder.FirstOrDefault(x => x.ProjectId == projectId);
            }

            return data;
        }

        /// <summary>
        /// Add ProjectFunder
        /// </summary>
        /// <param name="projectFunder">The ProjectFunder to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectFunder/Add")]
        public bool Add([FromBody]ProjectFunder projectFunder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectFunder.Count(x => x.ProjectFunderId == projectFunder.ProjectFunderId) == 0)
                {
                    //Add ProjectFunder entry
                    context.ProjectFunder.Add(projectFunder);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ProjectFunder
        /// </summary>
        /// <param name="projectFunder">ProjectFunder to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectFunder/Update")]
        public bool Update([FromBody]ProjectFunder projectFunder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectFunder.FirstOrDefault(x => x.ProjectFunderId == projectFunder.ProjectFunderId);
                if (data != null)
                {
                    data.FunderId = projectFunder.FunderId;
                    data.FundingStatusId = projectFunder.FundingStatusId;
                    data.ProjectId = projectFunder.ProjectId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectFunder
        /// </summary>
        /// <param name="projectFunder">ProjectFunder to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectFunder/Delete")]
        public bool Delete([FromBody]ProjectFunder projectFunder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectFunder.FirstOrDefault(x => x.ProjectFunderId == projectFunder.ProjectFunderId);
                if (data != null)
                {
                    context.ProjectFunder.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectFunder by Id
        /// </summary>
        /// <param name="id">Id of ProjectFunder to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectFunder/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectFunder.FirstOrDefault(x => x.ProjectFunderId == id);
                if (data != null)
                {
                    context.ProjectFunder.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}