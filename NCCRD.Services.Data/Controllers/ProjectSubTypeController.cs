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
    /// Manage ProjectSubType data
    /// </summary>
    public class ProjectSubTypeController : ApiController
    {
        /// <summary>
        /// Get all ProjectSubType data
        /// </summary>
        /// <returns>ProjectSubType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectSubType/GetAll")]
        public IEnumerable<ProjectSubType> GetAll()
        {
            List<ProjectSubType> data = new List<ProjectSubType>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectSubType.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectSubType by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectSubType to get</param>
        /// <returns>ProjectSubType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectSubType/GetByID/{id}")]
        public ProjectSubType GetByID(int id)
        {
            ProjectSubType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ProjectSubType by ProjectTypeId
        /// </summary>
        /// <param name="projectTypeId">The ProjectTypeId of the ProjectSubType to get</param>
        /// <returns>ProjectSubType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectSubType/GetByProjectTypeID/{projectTypeId}")]
        public ProjectSubType GetByProjectTypeID(int projectTypeId)
        {
            ProjectSubType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectSubType.FirstOrDefault(x => x.ProjectTypeId == projectTypeId);
            }

            return data;
        }

        /// <summary>
        /// Add ProjectSubType
        /// </summary>
        /// <param name="projectSubType">The ProjectSubType to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectSubType/Add")]
        public bool Add([FromBody]ProjectSubType projectSubType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectSubType.Count(x => x.ProjectSubTypeId == projectSubType.ProjectSubTypeId) == 0)
                {
                    //Add ProjectSubType entry
                    context.ProjectSubType.Add(projectSubType);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ProjectSubType
        /// </summary>
        /// <param name="projectSubType">ProjectSubType to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectSubType/Update")]
        public bool Update([FromBody]ProjectSubType projectSubType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == projectSubType.ProjectSubTypeId);
                if (data != null)
                {
                    data.Value = projectSubType.Value;
                    data.Description = projectSubType.Description;
                    data.ProjectTypeId = projectSubType.ProjectTypeId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectSubType
        /// </summary>
        /// <param name="projectSubType">ProjectSubType to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectSubType/Delete")]
        public bool Delete([FromBody]ProjectSubType projectSubType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == projectSubType.ProjectSubTypeId);
                if (data != null)
                {
                    context.ProjectSubType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectSubType by Id
        /// </summary>
        /// <param name="id">Id of ProjectSubType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectSubType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == id);
                if (data != null)
                {
                    context.ProjectSubType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}