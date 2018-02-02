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
    /// Manage Project data
    /// </summary>
    //[Authorize(Roles = "Administrator,Project Owner")]
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
                projectList = context.Project.ToList();
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
                project = context.Project.FirstOrDefault(x => x.ProjectId == id);
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
                project = context.Project.FirstOrDefault(x => x.ProjectTitle == title);
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
                //Check if Project exists
                if (context.Project.Count(x => x.ProjectTitle == project.ProjectTitle) == 0)
                {
                    //Add Project
                    context.Project.Add(project);                  
                    context.SaveChanges();

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
                //Check if Project exists
                var existProj = context.Project.FirstOrDefault(x => x.ProjectId == project.ProjectId);
                if(existProj != null)
                {
                    //Update existing project
                    existProj.ProjectTitle = project.ProjectTitle;
                    existProj.ProjectDescription = project.ProjectDescription;
                    existProj.LeadAgent = project.LeadAgent;
                    existProj.HostPartner = project.HostPartner;
                    existProj.HostOrganisation = project.HostOrganisation;
                    existProj.StartYear = project.StartYear;
                    existProj.EndYear = project.EndYear;
                    existProj.ReminderSent = project.ReminderSent;
                    existProj.AlternativeContact = project.AlternativeContact;
                    existProj.AlternativeContactEmail = project.AlternativeContactEmail;
                    existProj.Link = project.Link;
                    existProj.ValidationComments = project.ValidationComments;
                    existProj.BudgetLower = project.BudgetLower;
                    existProj.BudgetUpper = project.BudgetUpper;
                    existProj.ProjectTypeId = project.ProjectTypeId;
                    existProj.ProjectSubTypeId = project.ProjectSubTypeId;
                    existProj.ProjectStatusId = project.ProjectStatusId;
                    existProj.ProjectManagerId = project.ProjectManagerId;
                    existProj.ValidationStatusId = project.ValidationStatusId;
                    existProj.MAOptionId = project.MAOptionId;
                    context.SaveChanges();

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
                //Check if Project exists
                var delProj = context.Project.FirstOrDefault(x => x.ProjectId == project.ProjectId);
                if(delProj != null)
                {
                    //Remove Project
                    context.Project.Remove(delProj);
                    context.SaveChanges();

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
                //Check if Project exists
                var delProj = context.Project.FirstOrDefault(x => x.ProjectId == id);
                if (delProj != null)
                {
                    //Remove Project
                    context.Project.Remove(delProj);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Project by Title
        /// </summary>
        /// <param name="title">Title of Project to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Projects/DeleteByTitle/{title}")]
        public bool DeleteByTitle(string title)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if Project exists
                var delProj = context.Project.FirstOrDefault(x => x.ProjectTitle == title);
                if (delProj != null)
                {
                    //Remove Project
                    context.Project.Remove(delProj);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}