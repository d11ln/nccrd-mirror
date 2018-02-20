using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using static NCCRD.Services.Data.Models.ProjectsViewModel;

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
                projectList = context.Project.OrderBy(p => p.ProjectTitle).ToList();
            }

            return projectList;
        }

        /// <summary>
        /// Get all Projects filtered on query params
        /// </summary>
        /// <param name="titlePart">Part of a title to search on</param>
        /// <param name="statusId">ProjectStatusId to filter on</param>
        /// <param name="regionId">RegionId to filter on</param>
        /// <param name="sectorId">RegionId to filter on</param>
        /// <param name="typologyId">TypologyId to filter on</param>
        /// <returns>Projects data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetAllFiltered")]
        public IEnumerable<Project> GetAllFiltered(string titlePart = "", int statusId = 0, int regionId = 0, int sectorId = 0, int typologyId = 0)
        {
            List<Project> projectList = new List<Project>();

            using (var context = new SQLDBContext())
            {
                //GET FILTER DATA
                var regionProjectIds = new List<int>();
                if (regionId > 0)
                {
                    //Get all RegionIds (including children)
                    var regionIds = GetChildRegions(regionId, context.Region.ToList()).Select(r => r.RegionId).Distinct();

                    //Get all ProjectIds assigned to these Regions and/or Typology
                    regionProjectIds = context.ProjectRegion.Where(p => regionIds.Contains(p.RegionId)).Select(p => p.ProjectId).Distinct().ToList();
                }

                var sectorTypologyProjectIds = new List<int>();
                if (typologyId > 0 || sectorId > 0)
                {
                    sectorTypologyProjectIds = context.MitigationDetails.Where(x => (typologyId == 0 || x.Sector.TypologyId == typologyId) && (sectorId == 0 || x.SectorId == sectorId)).Select(x => x.ProjectId).ToList();
                    sectorTypologyProjectIds.AddRange(context.AdaptationDetails.Where(x => (typologyId == 0 || x.Sector.TypologyId == typologyId) && (sectorId == 0 || x.SectorId == sectorId)).Select(x => x.ProjectId).ToList());
                    sectorTypologyProjectIds.AddRange(context.ResearchDetails.Where(x => (typologyId == 0 || x.Sector.TypologyId == typologyId) && (sectorId == 0 || x.SectorId == sectorId)).Select(x => x.ProjectId).ToList());

                    //Remove duplicates
                    sectorTypologyProjectIds = sectorTypologyProjectIds.Distinct().ToList();
                }

                //GET PORJECTS FILTERED//
                //Retrieve project details and filter on query params
                projectList = context.Project.OrderBy(p => p.ProjectTitle).
                    Where(p => 
                        (string.IsNullOrEmpty(titlePart) || p.ProjectTitle.ToLower().Contains(titlePart.ToLower())) &&
                        (statusId == 0 || p.ProjectStatusId == statusId) &&
                        (regionId == 0 || regionProjectIds.Contains(p.ProjectId)) &&
                        ((typologyId == 0 && sectorId == 0) || sectorTypologyProjectIds.Contains(p.ProjectId))).
                    ToList();
            }

            return projectList;
        }

        private List<Region> GetChildRegions(int regionId, List<Region> regionList)
        {
            var regions = regionList.Where(x => x.ParentRegionID == regionId).ToList();

            var childRegions = new List<Region>();
            foreach (var region in regions)
            {
                childRegions.AddRange(GetChildRegions(region.RegionId, regionList));
            }
            regions.AddRange(childRegions);

            return regions;
        }

        /// <summary>
        /// Get Projects (GeoJson)
        /// </summary>
        /// <param name="titlePart">Part of a title to search on</param>
        /// <param name="statusId">ProjectStatusId to filter on</param>
        /// <param name="regionId">RegionId to filter on</param>
        /// <param name="sectorId">RegionId to filter on</param>
        /// <param name="typologyId">TypologyId to filter on</param>
        /// <returns>Project data in GeoJson standard/format</returns>
        [HttpGet]
        [Route("api/Projects/GEO/GetAll")]
        public List<ProjectGeoJson> GeoGetAll(string titlePart = "", int statusId = 0, int regionId = 0, int sectorId = 0, int typologyId = 0)
        {
            List<ProjectGeoJson> projectGeo = new List<ProjectGeoJson>();

            using (var context = new SQLDBContext())
            {
                //GET FILTER DATA//
                var regionProjectIds = new List<int>();
                if (regionId > 0)
                {
                    //Get all RegionIds (including children)
                    var regionIds = GetChildRegions(regionId, context.Region.ToList()).Select(r => r.RegionId).Distinct();

                    //Get all ProjectIds assigned to these Regions and/or Typology
                    regionProjectIds = context.ProjectRegion.Where(p => regionIds.Contains(p.RegionId)).Select(p => p.ProjectId).Distinct().ToList();
                }

                var sectorTypologyProjectIds = new List<int>();
                if (typologyId > 0 || sectorId > 0)
                {
                    sectorTypologyProjectIds = context.MitigationDetails.Where(x => (typologyId == 0 || x.Sector.TypologyId == typologyId) && (sectorId == 0 || x.SectorId == sectorId)).Select(x => x.ProjectId).ToList();
                    sectorTypologyProjectIds.AddRange(context.AdaptationDetails.Where(x => (typologyId == 0 || x.Sector.TypologyId == typologyId) && (sectorId == 0 || x.SectorId == sectorId)).Select(x => x.ProjectId).ToList());
                    sectorTypologyProjectIds.AddRange(context.ResearchDetails.Where(x => (typologyId == 0 || x.Sector.TypologyId == typologyId) && (sectorId == 0 || x.SectorId == sectorId)).Select(x => x.ProjectId).ToList());

                    //Remove duplicates
                    sectorTypologyProjectIds = sectorTypologyProjectIds.Distinct().ToList();
                }

                //GET PROJECT DATA FILTERED//
                var projectData = (from proj in context.Project.Where(p =>
                                                                    (string.IsNullOrEmpty(titlePart) || p.ProjectTitle.ToLower().Contains(titlePart.ToLower())) &&
                                                                    (statusId == 0 || p.ProjectStatusId == statusId) &&
                                                                    (regionId == 0 || regionProjectIds.Contains(p.ProjectId)) &&
                                                                    ((typologyId == 0 && sectorId == 0) || sectorTypologyProjectIds.Contains(p.ProjectId)))
                                   join projLoc in context.ProjectLocation on proj.ProjectId equals projLoc.ProjectId
                                   join loc in context.Location on projLoc.LocationId equals loc.LocationId
                                   join projStat in context.ProjectStatus on proj.ProjectStatusId equals projStat.ProjectStatusId
                                   select new
                                   {
                                       proj.ProjectId,
                                       proj.ProjectTitle,
                                       ProjectStatus = projStat.Value,
                                       loc.LatCalculated,
                                       loc.LonCalculated
                                   }).ToList();

                foreach(var projDat in projectData)
                {
                    ProjectGeoJson item = new ProjectGeoJson();
                    item.type = "Feature";
                    item.geometry = new Geometry()
                    {
                        type = "Point",
                        coordinates = new List<double>() { (double)projDat.LatCalculated, (double)projDat.LonCalculated }
                    };
                    item.properties.Add("id", projDat.ProjectId.ToString());
                    item.properties.Add("name", projDat.ProjectTitle);
                    item.properties.Add("status", projDat.ProjectStatus);

                    projectGeo.Add(item);
                }
            }

            return projectGeo;
        }

        /// <summary>
        /// Get Project by Id
        /// </summary>
        /// <param name="id">The Id of the Project to get</param>
        /// <returns>Project data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetByID/{id}")]
        public ProjectDetailsViewModel GetByID(int id)
        {
            ProjectDetailsViewModel project = null;

            using (var context = new SQLDBContext())
            {
                project = new ProjectDetailsViewModel(context.Project.FirstOrDefault(x => x.ProjectId == id));

                if(project.BudgetLower == null)
                {
                    project.BudgetLower = 0.00M;
                }
                if (project.BudgetUpper == null)
                {
                    project.BudgetUpper = 0.00M;
                }
                if (project.Link == "")
                {
                    project.Link = "#";
                }

                project.Link = project.Link.Trim();
                if(project.Link.StartsWith("www"))
                {
                    project.Link = "http://" + project.Link;
                }

                project.ProjectTypeName = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == project.ProjectTypeId).Value;

                if (project.ProjectSubTypeId != null)
                {
                    project.ProjectSubTypeName = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == project.ProjectSubTypeId).Value;
                }

                project.ProjectStatusName = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == project.ProjectStatusId).Value;

                project.ProjectManagerName = context.Users.Select(x => new { x.UserId, Name = (x.FirstName + " " + x.Surname) }).FirstOrDefault(x => x.UserId == project.ProjectManagerId).Name;

                if (project.ValidationStatusId != null)
                {
                    project.ValidationStatusName = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == project.ValidationStatusId).Value;
                }

                if (project.MAOptionId != null)
                {
                    project.MAOptionName = context.MAOptions.FirstOrDefault(x => x.MAOptionId == project.MAOptionId).Name;
                }
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
                    //Populate FK refs
                    project.ProjectType = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == project.ProjectTypeId);

                    project.ProjectSubType = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == project.ProjectSubTypeId);
                    if (project.ProjectSubTypeId == 0) project.ProjectSubTypeId = null;

                    project.ProjectStatus = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == project.ProjectStatusId);
                    project.ProjectManager = context.Users.FirstOrDefault(x => x.UserId == project.ProjectManagerId);

                    project.ValidationStatus = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == project.ValidationStatusId);
                    if (project.ValidationStatusId == 0) project.ValidationStatusId = null;

                    project.MAOption = context.MAOptions.FirstOrDefault(x => x.MAOptionId == project.MAOptionId);
                    if (project.MAOptionId == 0) project.MAOptionId = null;


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
                if (existProj != null)
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
                    existProj.ProjectType = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == project.ProjectTypeId);

                    existProj.ProjectSubTypeId = project.ProjectSubTypeId == 0 ? null : project.ProjectSubTypeId;
                    existProj.ProjectSubType = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == project.ProjectSubTypeId);

                    existProj.ProjectStatusId = project.ProjectStatusId;
                    existProj.ProjectStatus = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == project.ProjectStatusId);

                    existProj.ProjectManagerId = project.ProjectManagerId;
                    existProj.ProjectManager = context.Users.FirstOrDefault(x => x.UserId == project.ProjectManagerId);

                    existProj.ValidationStatusId = project.ValidationStatusId == 0 ? null : project.ValidationStatusId;
                    existProj.ValidationStatus = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == project.ValidationStatusId);

                    existProj.MAOptionId = project.MAOptionId == 0 ? null : project.MAOptionId;
                    existProj.MAOption = context.MAOptions.FirstOrDefault(x => x.MAOptionId == project.MAOptionId);

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