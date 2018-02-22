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
    /// Manage ProjectType data
    /// </summary>
    public class ProjectTypeController : ApiController
    {
        /// <summary>
        /// Get all ProjectType data
        /// </summary>
        /// <returns>ProjectType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectType/GetAll")]
        public IEnumerable<ProjectType> GetAll()
        {
            List<ProjectType> data = new List<ProjectType>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectType.OrderBy(x => x.Value.Trim()).ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectType by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectType to get</param>
        /// <returns>ProjectType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectType/GetByID/{id}")]
        public ProjectType GetByID(int id)
        {
            ProjectType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ProjectType by Value
        /// </summary>
        /// <param name="value">The Value of the ProjectType to get</param>
        /// <returns>ProjectType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectType/GetByValue/{value}")]
        public ProjectType GetByValue(string value)
        {
            ProjectType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectType.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add ProjectType
        /// </summary>
        /// <param name="projectType">The ProjectType to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectType/Add")]
        public bool Add([FromBody]ProjectType projectType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectType.Count(x => x.ProjectTypeId == projectType.ProjectTypeId) == 0)
                {
                    //Add ProjectSubType entry
                    context.ProjectType.Add(projectType);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ProjectType
        /// </summary>
        /// <param name="projectType">ProjectType to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectType/Update")]
        public bool Update([FromBody]ProjectType projectType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == projectType.ProjectTypeId);
                if (data != null)
                {
                    data.Value = projectType.Value;
                    data.Description = projectType.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectType
        /// </summary>
        /// <param name="projectType">ProjectType to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectType/Delete")]
        public bool Delete([FromBody]ProjectType projectType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == projectType.ProjectTypeId);
                if (data != null)
                {
                    context.ProjectType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectType by Id
        /// </summary>
        /// <param name="id">Id of ProjectType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == id);
                if (data != null)
                {
                    context.ProjectType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}