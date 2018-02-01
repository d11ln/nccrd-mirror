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
    /// Manage ProjectTypology data
    /// </summary>
    public class ProjectTypologyController : ApiController
    {
        /// <summary>
        /// Get all ProjectTypology data
        /// </summary>
        /// <returns>ProjectTypology data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectTypology/GetAll")]
        public IEnumerable<ProjectTypology> GetAll()
        {
            List<ProjectTypology> data = new List<ProjectTypology>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectTypology.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ProjectTypology by Id
        /// </summary>
        /// <param name="id">The Id of the ProjectTypology to get</param>
        /// <returns>ProjectTypology data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectTypology/GetByID/{id}")]
        public ProjectTypology GetByID(int id)
        {
            ProjectTypology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectTypology.FirstOrDefault(x => x.ProjectTypologyId == id);
            }

            return data;
        }


        /// <summary>
        /// Get ProjectTypology by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the ProjectTypology to get</param>
        /// <returns>ProjectTypology data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectTypology/GetByProjectID/{projectId}")]
        public ProjectTypology GetByProjectID(int projectId)
        {
            ProjectTypology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ProjectTypology.FirstOrDefault(x => x.ProjectId == projectId);
            }

            return data;
        }

        /// <summary>
        /// Add ProjectTypology
        /// </summary>
        /// <param name="projectTypology">The ProjectTypology to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectTypology/Add")]
        public bool Add([FromBody]ProjectTypology projectTypology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ProjectTypology.Count(x => x.ProjectTypologyId == projectTypology.ProjectTypologyId) == 0)
                {
                    //Add ProjectTypology entry
                    context.ProjectTypology.Add(projectTypology);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ProjectTypology
        /// </summary>
        /// <param name="projectTypology">ProjectTypology to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectTypology/Update")]
        public bool Update([FromBody]ProjectTypology projectTypology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectTypology.FirstOrDefault(x => x.ProjectTypologyId == projectTypology.ProjectTypologyId);
                if (data != null)
                {
                    data.ProjectId = projectTypology.ProjectId;
                    data.TypologyId = projectTypology.TypologyId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectTypology
        /// </summary>
        /// <param name="projectTypology">ProjectTypology to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectTypology/Delete")]
        public bool Delete([FromBody]ProjectTypology projectTypology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectTypology.FirstOrDefault(x => x.ProjectTypologyId == projectTypology.ProjectTypologyId);
                if (data != null)
                {
                    context.ProjectTypology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectTypology by Id
        /// </summary>
        /// <param name="id">Id of ProjectTypology to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectTypology/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectTypology.FirstOrDefault(x => x.ProjectTypologyId == id);
                if (data != null)
                {
                    context.ProjectTypology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}