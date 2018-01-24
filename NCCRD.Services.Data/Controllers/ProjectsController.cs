using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
{
    /// <summary>
    /// Manage Project data
    /// </summary>
    public class ProjectsController : ApiController
    {
        /// <summary>
        /// Get all Projects
        /// </summary>
        /// <returns>Projects data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetAll")]
        public IEnumerable<Project> GetAll()
        {
            List<Project> projectList = new List<Project>();

            using (var context = new SQLDBContext())
            {
                projectList = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .ToList();
            }

            return projectList;
        }

        /// <summary>
        /// Get Project by Id
        /// </summary>
        /// <param name="id">The Id of the Project to get</param>
        /// <returns>Project data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetByID/{id}")]
        public Project GetByID(int id)
        {
            Project project = null;

            using (var context = new SQLDBContext())
            {
                project = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .FirstOrDefault(x => x.ProjectId == id);
            }

            return project;
        }

        /// <summary>
        /// Get Project by Title
        /// </summary>
        /// <param name="title">The Title of the Project to get</param>
        /// <returns>Project data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetByTitle/{title}")]
        public Project GetByTitle(string title)
        {
            Project project = null;

            using (var context = new SQLDBContext())
            {
                project = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .FirstOrDefault(x => x.ProjectTitle == title);
            }

            return project;
        }

        /// <summary>
        /// Add Project
        /// </summary>
        /// <param name="project">The Project to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Projects/Add")]
        public bool Add([FromBody]Project project)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                var oldProject = project = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .FirstOrDefault(x => x.ProjectId == project.ProjectId);

                if (oldProject != null)
                {
                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Project
        /// </summary>
        /// <param name="project">Project to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Projects/Update")]
        public bool Update([FromBody]Project project)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                var oldProject = project = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .FirstOrDefault(x => x.ProjectId == project.ProjectId);

                if (oldProject != null)
                {
                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Project
        /// </summary>
        /// <param name="project">Project to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Projects/Delete")]
        public bool Delete([FromBody]Project project)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                var oldProject = project = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .FirstOrDefault(x => x.ProjectId == project.ProjectId);

                if (oldProject != null)
                {
                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Project by Id
        /// </summary>
        /// <param name="id">Id of Project to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Projects/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                var oldProject = context.Project
                    .Include("ProjectType")
                    .Include("ProjectSubType.ProjectType")
                    .Include("ProjectStatus")
                    .Include("ProjectManager.UserRole")
                    .Include("ProjectManager.Title")
                    .Include("ValidationStatus")
                    .Include("MAOption.Feasibility")
                    .Include("MAOption.Hazard")
                    .Include("MAOption.Sector")
                    .FirstOrDefault(x => x.ProjectId == id);

                if (oldProject != null)
                {
                    result = true;
                }
            }

            return result;
        }
    }
}