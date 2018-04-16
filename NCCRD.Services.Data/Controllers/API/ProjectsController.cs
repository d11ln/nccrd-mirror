using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        /// Get all Projects filtered on query params
        /// </summary>
        /// <param name="titlePart">Part of a title to search on</param>
        /// <param name="statusId">ProjectStatusId to filter on</param>
        /// <param name="regionId">RegionId to filter on</param>
        /// <param name="sectorId">RegionId to filter on</param>
        /// <param name="typologyId">TypologyId to filter on</param>
        /// <param name="batchSize">Download batch size</param>
        /// <param name="batchCount">Download batch number</param>
        /// <returns>Projects data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetAll")]
        public IEnumerable<Project> GetAll(string titlePart = "", int statusId = 0, int regionId = 0, int sectorId = 0, int typologyId = 0, int batchSize = 0, int batchCount = 0)
        {
            List<Project> projectList = new List<Project>();

            using (var context = new SQLDBContext())
            {
                //GET FILTER DATA
                var regionProjectIds = new List<int>();
                if (regionId > 0)
                {
                    //Get all RegionIds (including children)
                    var allRegionIDs = GetChildRegions(regionId, context.Region.ToList()).Select(r => r.RegionId).Distinct().ToList();
                    allRegionIDs.Add(regionId);

                    //Get all ProjectIds assigned to these Regions and/or Typology
                    regionProjectIds = context.ProjectRegion.Where(p => allRegionIDs.Contains(p.RegionId)).Select(p => p.ProjectId).Distinct().ToList();
                }

                var sectorTypologyProjectIds = new List<int>();
                if (typologyId > 0 || sectorId > 0)
                {
                    if (sectorId > 0)
                    {
                        var allSectorIDs = GetChildSectors(sectorId, context.Sector.ToList()).Select(x => (int?)x.SectorId).ToList();
                        allSectorIDs.Add(sectorId);

                        sectorTypologyProjectIds.AddRange(context.MitigationDetails.Where(x => sectorId == 0 || allSectorIDs.Contains(x.SectorId)).Select(x => x.ProjectId).ToList());
                        sectorTypologyProjectIds.AddRange(context.AdaptationDetails.Where(x => sectorId == 0 || allSectorIDs.Contains(x.SectorId)).Select(x => x.ProjectId).ToList());
                        sectorTypologyProjectIds.AddRange(context.ResearchDetails.Where(x => sectorId == 0 || allSectorIDs.Contains(x.SectorId)).Select(x => x.ProjectId).ToList());
                    }

                    if (typologyId > 0)
                    {
                        sectorTypologyProjectIds.AddRange(context.MitigationDetails.Where(x => typologyId == 0 || x.Sector.TypologyId == typologyId).Select(x => x.ProjectId).ToList());
                        sectorTypologyProjectIds.AddRange(context.AdaptationDetails.Where(x => typologyId == 0 || x.Sector.TypologyId == typologyId).Select(x => x.ProjectId).ToList());
                        sectorTypologyProjectIds.AddRange(context.ResearchDetails.Where(x => typologyId == 0 || x.Sector.TypologyId == typologyId).Select(x => x.ProjectId).ToList());
                    }

                    //Remove duplicates
                    sectorTypologyProjectIds = sectorTypologyProjectIds.Distinct().ToList();
                }

                if (batchSize <= 0)
                {
                    batchSize = context.Project.Count();
                }

                if (batchCount <= 0)
                {
                    batchCount = 1;
                }

                //GET PORJECTS FILTERED//
                //Retrieve project details and filter on query params
                projectList = context.Project.OrderBy(p => p.ProjectTitle)
                                .Where(p =>
                                    (string.IsNullOrEmpty(titlePart) || p.ProjectTitle.ToLower().Contains(titlePart.ToLower())) &&
                                    (statusId == 0 || p.ProjectStatusId == statusId) &&
                                    (regionId == 0 || regionProjectIds.Contains(p.ProjectId)) &&
                                    ((typologyId == 0 && sectorId == 0) || sectorTypologyProjectIds.Contains(p.ProjectId)))
                                .Skip((batchCount - 1) * batchSize)
                                .Take(batchSize)
                                .ToList();
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
        /// <param name="batchSize">Download batch size</param>
        /// <param name="batchCount">Download batch number</param>
        /// <returns>Minimal Projects data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetAll/List")]
        public IEnumerable<ProjectListViewModel> GetAllList(string titlePart = "", int statusId = 0, int regionId = 0, int sectorId = 0, int typologyId = 0, int batchSize = 0, int batchCount = 0)
        {
            var projectData = new List<ProjectListViewModel>();

            projectData = GetAll(titlePart, statusId, regionId, sectorId, typologyId, batchSize, batchCount)
                            .Select(x => new ProjectListViewModel()
                            {
                                ProjectId = x.ProjectId,
                                ProjectTitle = x.ProjectTitle,
                                ProjectDescription = x.ProjectDescription
                            }).ToList();

            return projectData;
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

        private List<Sector> GetChildSectors(int sectorId, List<Sector> sectorList)
        {
            var sectors = sectorList.Where(x => x.ParentSectorId == sectorId).ToList();

            var childSectors = new List<Sector>();
            foreach (var sector in sectors)
            {
                childSectors.AddRange(GetChildSectors(sector.SectorId, sectorList));
            }
            sectors.AddRange(childSectors);

            return sectors;
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

            var projectIDs = GetAll(titlePart, statusId, regionId, sectorId, typologyId).Select(p => p.ProjectId).ToList();

            using (var context = new SQLDBContext())
            {
                //GET PROJECT DATA FILTERED//
                var projectData = (from proj in context.Project.Where(p => projectIDs.Contains(p.ProjectId))
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

                foreach (var projDat in projectData)
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
        public Project GetByID(int id)
        {
            Project project = null;

            using (var context = new SQLDBContext())
            {
                project = context.Project.FirstOrDefault(x => x.ProjectId == id);

                //project = new ProjectDetailsViewModel(context.Project.FirstOrDefault(x => x.ProjectId == id));

                //if(project.BudgetLower == null)
                //{
                //    project.BudgetLower = 0.00M;
                //}
                //if (project.BudgetUpper == null)
                //{
                //    project.BudgetUpper = 0.00M;
                //}
                //if (project.Link == "")
                //{
                //    project.Link = "#";
                //}

                //project.Link = project.Link.Trim();
                //if(project.Link.StartsWith("www"))
                //{
                //    project.Link = "http://" + project.Link;
                //}

                //project.ProjectTypeName = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == project.ProjectTypeId).Value;

                //if (project.ProjectSubTypeId != null)
                //{
                //    project.ProjectSubTypeName = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == project.ProjectSubTypeId).Value;
                //}

                //project.ProjectStatusName = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == project.ProjectStatusId).Value;

                //project.ProjectManagerName = context.Users.Select(x => new { x.UserId, Name = (x.FirstName + " " + x.Surname) }).FirstOrDefault(x => x.UserId == project.ProjectManagerId).Name;

                //if (project.ValidationStatusId != null)
                //{
                //    project.ValidationStatusName = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == project.ValidationStatusId).Value;
                //}

                //if (project.MAOptionId != null)
                //{
                //    project.MAOptionName = context.MAOptions.FirstOrDefault(x => x.MAOptionId == project.MAOptionId).Name;
                //}
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
        /// Get Projects by Polygon
        /// </summary>
        /// <param name="polygon">The Polygon definition to search in</param>
        /// <returns>Projects data as JSON</returns>
        [HttpGet]
        [Route("api/Projects/GetByPolygon")]
        public List<PolygonFilterResults> GetByPolygon(string polygon)
        {
            List<PolygonFilterResults> results = new List<PolygonFilterResults>();

            using (var context = new SQLDBContext())
            {
                //project = context.Project.FirstOrDefault(x => x.ProjectTitle == title);

                var polygonWKT = new SqlParameter("@WKT", polygon);

                results = context.Database
                    .SqlQuery<PolygonFilterResults>("PolygonFilter @WKT", polygonWKT)
                    .ToList();
            }

            return results;
        }

        /// <summary>
        /// Add Project
        /// </summary>
        /// <param name="project">The Project to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Projects/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]Project project)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if Project exists
                var existProj = context.Project.FirstOrDefault(x => x.ProjectId == project.ProjectId);
                if (existProj == null)
                {
                    //## ADD PROJECT ##//

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

                    context.Project.Add(project);
                }
                else
                {
                    //## UPDATE PROJECT ##//
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
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

    }
}