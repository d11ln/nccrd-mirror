//using NCCRD.Database.Models;
//using NCCRD.Services.Data.Classes;
//using NCCRD.Services.Data.Models;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Threading.Tasks;
//using System.Web;
//using System.Web.Mvc;

//namespace NCCRD.Services.Data.Controllers.MVC
//{
//    public class ProjectsController : Controller
//    {
//        private const string unfilteredKey = "[Unfiltered]";

//        // GET: Project
//        //public async Task<ActionResult> Index()
//        //{
//        //    var model = new ProjectsViewModel()
//        //    {
//        //        Projects = await GetProjects(),
//        //        Regions = await GetRegions(),
//        //        LocationTypes = await GetLocationTypes()
//        //    };

//        //    return View(model);
//        //}

//        public async Task<ActionResult> Index()
//        {
//            return View("List");
//        }

//        [HttpGet]
//        public async Task<ActionResult> List(string partTitle, int regionId)
//        {
//            var projects = await GetProjects();

//            //Filter on Title
//            if (!string.IsNullOrEmpty(partTitle) && partTitle != "undefined")
//            {
//                projects = projects.Where(p => p.ProjectTitle.ToLower().Contains(partTitle.ToLower())).ToList();
//            }

//            //Filter on Region
//            if (regionId > 0)
//            {
//                var filterRegionIds = (await GetRegions(regionId)).Select(r => r.RegionId).ToList();
//                var projectIds = (await GetProjectRegions()).Where(pr => filterRegionIds.Contains(pr.RegionId)).Select(pr => pr.ProjectId).ToList();
//                projects = projects.Where(p => projectIds.Contains(p.ProjectId)).ToList();
//            }

//            var model = new ProjectsViewModel()
//            {
//                Projects = projects
//            };

//            return PartialView(model);
//        }

//        private List<Region> GetChildRegions(int regionId, List<Region> regionList)
//        {
//            var regions = regionList.Where(x => x.ParentRegionID == regionId).ToList();

//            var childRegions = new List<Region>();
//            foreach (var region in regions)
//            {
//                childRegions.AddRange(GetChildRegions(region.RegionId, regionList));
//            }
//            regions.AddRange(childRegions);

//            return regions;
//        }

//        public async Task<ActionResult> UpdateRegionList(int regionId)
//        {
//            var regions = await GetRegions(regionId);
//            //var parentRegion = regions.FirstOrDefault(r => r.RegionId == regionId);

//            var orderedRegions = new List<Region>();
//            orderedRegions.AddRange(regions.Where(x => x.RegionName == unfilteredKey).OrderBy(x => x.RegionId));
//            orderedRegions.AddRange(regions.Where(x => x.RegionName != unfilteredKey).OrderBy(x => x.RegionName));

//            return Json(orderedRegions, JsonRequestBehavior.AllowGet);
//        }

//        private async Task<List<Project>> GetProjects()
//        {
//            APIClient client = new APIClient();
//            var projectsJson = await client.Get("api/Projects/GetAll", Session.GetAccessToken());
//            var projects = JsonConvert.DeserializeObject<List<Project>>(projectsJson);
//            return projects;
//        }


//        private async Task<List<Region>> GetRegions(int parentRegionId = 0)
//        {
//            APIClient client = new APIClient();
//            var regionsJson = await client.Get("api/Region/GetAll", Session.GetAccessToken());
//            var regions = JsonConvert.DeserializeObject<List<Region>>(regionsJson);

//            var filteredRegions = new List<Region>();
//            if (parentRegionId > 0 && regions.FirstOrDefault(x => x.RegionId == parentRegionId).RegionName != unfilteredKey)
//            {
//                //filteredRegions.Add(regions.FirstOrDefault(x => x.RegionId == parentRegionId));
//                filteredRegions.AddRange(GetChildRegions(parentRegionId, regions));
//            }
//            else
//            {
//                filteredRegions = regions;
//            }

//            //Add "All" options
//            Region unfilteredRegion = new Region()
//            {
//                RegionName = unfilteredKey,
//            };
//            filteredRegions.Add(unfilteredRegion);

//            //Order
//            var orderedRegions = new List<Region>();
//            orderedRegions.AddRange(filteredRegions.Where(x => x.RegionName == unfilteredKey).OrderBy(x => x.RegionId));
//            orderedRegions.AddRange(filteredRegions.Where(x => x.RegionName != unfilteredKey).OrderBy(x => x.RegionName));

//            return orderedRegions;
//        }

//        private async Task<List<LocationType>> GetLocationTypes()
//        {
//            APIClient client = new APIClient();
//            var locTypeJson = await client.Get("api/LocationType/GetAll", Session.GetAccessToken());
//            var locTypes = JsonConvert.DeserializeObject<List<LocationType>>(locTypeJson);
//            return locTypes;
//        }

//        private async Task<List<ProjectRegion>> GetProjectRegions()
//        {
//            APIClient client = new APIClient();
//            var projectRegionsJson = await client.Get("api/ProjectRegion/GetAll", Session.GetAccessToken());
//            var projectRegions = JsonConvert.DeserializeObject<List<ProjectRegion>>(projectRegionsJson);
//            return projectRegions;
//        }

//    }


//}