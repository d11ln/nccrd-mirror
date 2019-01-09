using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Results;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NCCRD.Services.DataV2.Database.Contexts;
using NCCRD.Services.DataV2.Database.Models;
using NCCRD.Services.DataV2.Extensions;
using NCCRD.Services.DataV2.ViewModels;

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("ProjectDetails")]
    [EnableCors("CORSPolicy")]
    public class ProjectDetailsController : ODataController
    {
        private bool _projectAdded = false;

        public SQLDBContext _context { get; }
        public ProjectDetailsController(SQLDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get ProjectDetails for a specific ProjectId
        /// </summary>
        /// <param name="id">ProjectId</param>
        /// <returns>ProjectDetails for specified ProjectId</returns>
        [HttpGet]
        [EnableQuery(MaxExpansionDepth = 0)]
        [ODataRoute("({id})")]
        public ProjectDetails Get(int id)
        {
            //Get project and details
            var project = _context.Project
                .Include(x => x.ProjectRegions)
                .Include(x => x.ProjectDAOs)
                .Include(x => x.ProjectLocations).ThenInclude(x => x.Location)
                .FirstOrDefault(x => x.ProjectId == id);

            var funders = _context.ProjectFunder.Include(x => x.Funder).Where(x => x.ProjectId == id)
                .OrderBy(x => x.FunderId).Select(x => x.Funder).ToArray();

            var adaptations = _context.AdaptationDetails.Where(x => x.ProjectId == id)
                .OrderBy(x => x.AdaptationDetailId).ToArray();

            var mitigations = _context.MitigationDetails.Where(x => x.ProjectId == id)
                .OrderBy(x => x.MitigationDetailId).ToArray();

            var emissions = _context.MitigationEmissionsData.Where(x => x.ProjectId == id)
                .OrderBy(x => x.MitigationEmissionsDataId).ToArray();

            var research = _context.ResearchDetails.Where(x => x.ProjectId == id)
                .OrderBy(x => x.ResearchDetailId).ToArray();

            var lookups = new LookupsController(_context).GetLookups();

            var res = new ProjectDetails()
            {
                Id = id == 0 ? int.Parse(DateTime.Now.ToString("HHmmssfff")) : id,
                Project = project,
                Funders = funders,
                AdaptationDetails = adaptations,
                MitigationDetails = mitigations,
                MitigationEmissionsData = emissions,
                ResearchDetails = research,
                Lookups = lookups
            };

            return res;
        }

        //Add/Update
        /// <summary>
        /// Add/Update ProjectDetails
        /// </summary>
        /// <param name="data">A composite object containg all the project's details and associated data</param>
        /// <returns>ProjectId on success; Error/Code on fail</returns>
        [HttpPost]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]ProjectDetails data)
        {
            _projectAdded = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Save Project
            if (data.Project != null)
            {
                var result = SaveProjectAsync(data.Project);
                if (!(result is CreatedODataResult<Project> || result is UpdatedODataResult<Project>))
                {
                    return result;
                }
            }

            if (_projectAdded)
            {
                //Save new Project to get valid Id
                //Update ProjectId where needed
                try
                {
                    await _context.SaveChangesAsync();
                    data.Id = data.Project.ProjectId;

                    if (data.AdaptationDetails != null)
                    {
                        foreach (var item in data.AdaptationDetails)
                        {
                            item.ProjectId = data.Id;
                        }
                    }

                    if (data.MitigationDetails != null)
                    {
                        foreach (var item in data.MitigationDetails)
                        {
                            item.ProjectId = data.Id;
                        }
                    }

                    if (data.MitigationEmissionsData != null)
                    {
                        foreach (var item in data.MitigationEmissionsData)
                        {
                            item.ProjectId = data.Id;
                        }
                    }

                    if (data.ResearchDetails != null)
                    {
                        foreach (var item in data.ResearchDetails)
                        {
                            item.ProjectId = data.Id;
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            //Save Funders
            if (data.Funders != null)
            {
                foreach (var funder in data.Funders)
                {
                    var result = SaveFundersAsync(funder, data.Id);
                    if (!(result is CreatedODataResult<Funder> || result is UpdatedODataResult<Funder>))
                    {
                        return result;
                    }
                }
            }

            //Save Research
            //if (data.ResearchDetails != null)
            //{
            //    foreach (var research in data.ResearchDetails)
            //    {
            //        var result = SaveResearchAsync(research);
            //        if (!(result is CreatedODataResult<ResearchDetail> || result is UpdatedODataResult<ResearchDetail>))
            //        {
            //            return result;
            //        }
            //    }
            //}

            //Save Adaptations
            if (data.AdaptationDetails != null)
            {
                foreach (var adaptation in data.AdaptationDetails)
                {
                    //Save Research
                    if (adaptation.ResearchDetail != null)
                    {
                        var result2 = SaveResearchAsync(adaptation.ResearchDetail);
                        if (!(result2 is CreatedODataResult<ResearchDetail> || result2 is UpdatedODataResult<ResearchDetail>))
                        {
                            return result2;
                        }
                    }

                    //Save Adaptation
                    var result = SaveAdaptationAsync(adaptation);
                    if (!(result is CreatedODataResult<AdaptationDetail> || result is UpdatedODataResult<AdaptationDetail>))
                    {
                        return result;
                    }
                }
            }

            //Save Mitigations
            if (data.MitigationDetails != null)
            {
                foreach (var mitigation in data.MitigationDetails)
                {
                    //Save Research
                    if (mitigation.ResearchDetail != null)
                    {
                        var result2 = SaveResearchAsync(mitigation.ResearchDetail);
                        if (!(result2 is CreatedODataResult<ResearchDetail> || result2 is UpdatedODataResult<ResearchDetail>))
                        {
                            return result2;
                        }
                    }

                    var result = SaveMitigationAsync(mitigation);
                    if (!(result is CreatedODataResult<MitigationDetail> || result is UpdatedODataResult<MitigationDetail>))
                    {
                        return result;
                    }
                }
            }

            //Save Emissions
            if (data.MitigationEmissionsData != null)
            {
                foreach (var emissions in data.MitigationEmissionsData)
                {
                    var result = SaveEmissionsAsync(emissions);
                    if (!(result is CreatedODataResult<MitigationEmissionsData> || result is UpdatedODataResult<MitigationEmissionsData>))
                    {
                        return result;
                    }
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                RemoveUnusedLocations();
                //RemoveUnusedResearchDetails();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            //return data object
            return Ok(data);
        }

        private IActionResult SaveProjectAsync(Project project)
        {
            IActionResult result = null;

            //Check that ProjectTitle is unique
            if (_context.Project.AsNoTracking().FirstOrDefault(x => x.ProjectTitle == project.ProjectTitle && x.ProjectId != project.ProjectId) != null)
            {
                return BadRequest("ProjectTitle already exists");
            }

            var exiting = _context.Project.FirstOrDefault(x => x.ProjectId == project.ProjectId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref project);
                HelperExtensions.ClearNullableInts(ref project);
                _context.Project.Add(project);
                _projectAdded = true;
                result = Created(project);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(project);
                result = Updated(exiting);
            }

            //Save project related data
            SaveProjectRegions(project);
            SaveProjectDAOs(project);
            SaveProjectLocations(project);

            return result;
        }

        private void SaveProjectRegions(Project project)
        {
            //Add new mappings
            if (project.ProjectRegions == null)
            {
                project.ProjectRegions = new List<ProjectRegion>();
            }

            for (var i = 0; i < project.ProjectRegions.Count; i++)
            {
                var pr = project.ProjectRegions.ToArray()[i];

                if (!_context.ProjectRegion.Any(x => x.ProjectId == pr.ProjectId && x.RegionId == pr.RegionId))
                {
                    HelperExtensions.ClearIdentityValue(ref pr);
                    HelperExtensions.ClearNullableInts(ref pr);
                    _context.ProjectRegion.Add(pr);
                }
            }

            //Remove deleted mappings
            foreach (var pr in _context.ProjectRegion.Where(x => x.ProjectId == project.ProjectId))
            {
                if (!project.ProjectRegions.Any(x => x.ProjectId == pr.ProjectId && x.RegionId == pr.RegionId))
                {
                    _context.Remove(pr);
                }
            }
        }

        private void SaveProjectDAOs(Project project)
        {
            //Add new mappings
            if (project.ProjectDAOs == null)
            {
                project.ProjectDAOs = new List<ProjectDAO>();
            }

            for (var i = 0; i < project.ProjectDAOs.Count; i++)
            {
                var dao = project.ProjectDAOs.ToArray()[i];

                if (!_context.ProjectDAOs.Any(x => x.ProjectId == dao.ProjectId && x.DAOId == dao.DAOId))
                {
                    HelperExtensions.ClearIdentityValue(ref dao);
                    HelperExtensions.ClearNullableInts(ref dao);
                    _context.ProjectDAOs.Add(dao);
                }
            }

            //Remove deleted mappings
            foreach (var pr in _context.ProjectDAOs.Where(x => x.ProjectId == project.ProjectId))
            {
                if (!project.ProjectDAOs.Any(x => x.ProjectId == pr.ProjectId && x.DAOId == pr.DAOId))
                {
                    _context.Remove(pr);
                }
            }
        }

        private void SaveProjectLocations(Project project)
        {
            //Add new mappings
            if (project.ProjectLocations == null)
            {
                project.ProjectLocations = new List<ProjectLocation>();
            }

            //Save new locations and link existing ones before saving ProjectLocations
            SaveLocations(project.ProjectLocations.ToList());

            for (var i = 0; i < project.ProjectLocations.Count; i++)
            {
                var pl = project.ProjectLocations.ToArray()[i];

                if (!_context.ProjectLocation.Any(x => x.ProjectId == pl.ProjectId && x.LocationId == pl.LocationId))
                {
                    HelperExtensions.ClearIdentityValue(ref pl);
                    HelperExtensions.ClearNullableInts(ref pl);
                    _context.ProjectLocation.Add(pl);
                }
            }

            //Remove deleted mappings
            foreach (var pr in _context.ProjectLocation.Where(x => x.ProjectId == project.ProjectId))
            {
                if (!project.ProjectLocations.Any(x => x.ProjectId == pr.ProjectId && x.LocationId == pr.LocationId))
                {
                    _context.Remove(pr);
                }
            }
        }

        private void SaveLocations(List<ProjectLocation> projectLocations)
        {
            foreach (var prLoc in projectLocations)
            {
                var _prLoc = prLoc;

                HelperExtensions.ClearIdentityValue(ref _prLoc);
                HelperExtensions.ClearNullableInts(ref _prLoc);
                var loc = _prLoc.Location;

                //Check if location exists
                var exiting = _context.Location.FirstOrDefault(l => l.LocationId == loc.LocationId);

                if (exiting == null)
                {
                    //ADD
                    HelperExtensions.ClearIdentityValue(ref loc);
                    HelperExtensions.ClearNullableInts(ref loc);
                    _context.Location.Add(loc);

                    //Have to save to get actual/valid ID
                    _context.SaveChanges();

                    //Update references
                    prLoc.Location = loc;
                    prLoc.LocationId = loc.LocationId;

                }
                else
                {
                    //UPDATE
                    _context.Entry(exiting).CurrentValues.SetValues(loc);
                }
            }
        }

        private void RemoveUnusedLocations()
        {
            var usedLocationIDs = _context.ProjectLocation.Select(pl => pl.LocationId).Distinct().ToList();
            var unusedLocations = _context.Location.Where(l => !usedLocationIDs.Contains(l.LocationId)).ToArray();

            _context.Location.RemoveRange(unusedLocations);
            _context.SaveChangesAsync();
        }

        //private void RemoveUnusedResearchDetails()
        //{
        //    var usedResearchDetailIDs = new List<int>();
        //    usedResearchDetailIDs.AddRange(_context.AdaptationDetails.Where(a => a.ResearchDetail != null).Select(a => a.ResearchDetail.ResearchDetailId).Distinct().ToList());
        //    usedResearchDetailIDs.AddRange(_context.MitigationDetails.Where(a => a.ResearchDetail != null).Select(a => a.ResearchDetail.ResearchDetailId).Distinct().ToList());

        //    var unusedResearchDetails = _context.ResearchDetails.Where(rd => !usedResearchDetailIDs.Contains(rd.ResearchDetailId)).ToArray();

        //    _context.ResearchDetails.RemoveRange(unusedResearchDetails);
        //    _context.SaveChangesAsync();
        //}

        private IActionResult SaveFundersAsync(Funder funder, int projectId)
        {
            var exiting = _context.Funders.FirstOrDefault(x => x.FunderId == funder.FunderId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref funder);
                HelperExtensions.ClearNullableInts(ref funder);
                _context.Funders.Add(funder);
                _context.ProjectFunder.Add(new ProjectFunder
                {
                    Funder = funder,
                    ProjectId = projectId
                });

                return Created(funder);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(funder);
                return Updated(exiting);
            }
        }

        private IActionResult SaveAdaptationAsync(AdaptationDetail adaptation)
        {
            var exiting = _context.AdaptationDetails
                .Include(x => x.ResearchDetail)
                .FirstOrDefault(x => x.AdaptationDetailId == adaptation.AdaptationDetailId);

            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref adaptation);
                HelperExtensions.ClearNullableInts(ref adaptation);
                _context.AdaptationDetails.Add(adaptation);
                //await _context.SaveChangesAsync();
                return Created(adaptation);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(adaptation);

                if (adaptation.ResearchDetail == null)
                {
                    exiting.ResearchDetail = null;
                }
                else if (exiting.ResearchDetail == null && adaptation.ResearchDetail != null)
                {
                    exiting.ResearchDetail = adaptation.ResearchDetail;
                }
                else
                {
                    _context.Entry(exiting.ResearchDetail).CurrentValues.SetValues(adaptation.ResearchDetail);
                }

                //await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }

        private IActionResult SaveMitigationAsync(MitigationDetail mitigation)
        {
            var exiting = _context.MitigationDetails
                .Include(x => x.ResearchDetail)
                .FirstOrDefault(x => x.MitigationDetailId == mitigation.MitigationDetailId);

            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref mitigation);
                HelperExtensions.ClearNullableInts(ref mitigation);
                _context.MitigationDetails.Add(mitigation);
                //await _context.SaveChangesAsync();
                return Created(mitigation);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(mitigation);

                if(mitigation.ResearchDetail == null)
                {
                    exiting.ResearchDetail = null;
                }
                else if(exiting.ResearchDetail == null && mitigation.ResearchDetail != null)
                {
                    exiting.ResearchDetail = mitigation.ResearchDetail;
                }
                else{
                    _context.Entry(exiting.ResearchDetail).CurrentValues.SetValues(mitigation.ResearchDetail);
                }

                //await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }

        private IActionResult SaveEmissionsAsync(MitigationEmissionsData emissions)
        {
            var exiting = _context.MitigationEmissionsData.FirstOrDefault(x => x.MitigationEmissionsDataId == emissions.MitigationEmissionsDataId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref emissions);
                HelperExtensions.ClearNullableInts(ref emissions);
                _context.MitigationEmissionsData.Add(emissions);
                //await _context.SaveChangesAsync();
                return Created(emissions);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(emissions);
                //await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }

        private IActionResult SaveResearchAsync(ResearchDetail research)
        {
            var exiting = _context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == research.ResearchDetailId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref research);
                HelperExtensions.ClearNullableInts(ref research);
                _context.ResearchDetails.Add(research);
                _context.SaveChanges(); //Save changes to get DB ID
                return Created(research);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(research);
                //_context.SaveChanges();//Save changes to DB
                return Updated(exiting);
            }
        }

    }
}