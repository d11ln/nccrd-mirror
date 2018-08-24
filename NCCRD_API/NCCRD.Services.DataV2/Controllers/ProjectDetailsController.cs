using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Results;
using Microsoft.AspNet.OData.Routing;
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
        public SQLDBContext _context { get; }
        public ProjectDetailsController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [ODataRoute("({id})")]
        public ProjectDetails Get(int id)
        {
            //Get project and details
            var project = _context.Project.FirstOrDefault(x => x.ProjectId == id);
            var adaptations = _context.AdaptationDetails.Where(x => x.ProjectId == id).OrderBy(x => x.AdaptationDetailId).ToArray();
            var mitigations = _context.MitigationDetails.Where(x => x.ProjectId == id).OrderBy(x => x.MitigationDetailId).ToArray();
            var emissions = _context.MitigationEmissionsData.Where(x => x.ProjectId == id).OrderBy(x => x.MitigationEmissionsDataId).ToArray();
            var research = _context.ResearchDetails.Where(x => x.ProjectId == id).OrderBy(x => x.ResearchDetailId).ToArray();

            var lookups = new LookupsController(_context).GetLookups();

            return new ProjectDetails()
            {
                Id = id == 0 ? int.Parse(DateTime.Now.ToString("HHmmssfff")) : id,
                Project = project,
                AdaptationDetails = adaptations,
                MitigationDetails = mitigations,
                MitigationEmissionsData = emissions,
                ResearchDetails = research,
                Lookups = lookups
            };
        }

        //Add/Update
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]ProjectDetails data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Save Project
            if(data.Project != null)
            {
                var result = SaveProjectAsync(data.Project);
                if(!(result is CreatedODataResult<Project> || result is UpdatedODataResult<Project>))
                {
                    return result;
                }
            }

            //Save Adaptations
            if(data.AdaptationDetails != null)
            {
                foreach(var adaptation in data.AdaptationDetails)
                {
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

            //Save Research
            if (data.ResearchDetails != null)
            {
                foreach (var research in data.ResearchDetails)
                {
                    var result = SaveResearchAsync(research);
                    if (!(result is CreatedODataResult<ResearchDetail> || result is UpdatedODataResult<ResearchDetail>))
                    {
                        return result;
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok("success");
        }

        private IActionResult SaveProjectAsync(Project project)
        {
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
                //await _context.SaveChangesAsync();
                return Created(project);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(project);
                //await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }

        private IActionResult SaveAdaptationAsync(AdaptationDetail adaptation)
        {
            var exiting = _context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == adaptation.AdaptationDetailId);
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
                //await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }

        private IActionResult SaveMitigationAsync(MitigationDetail mitigation)
        {
            var exiting = _context.MitigationDetails.FirstOrDefault(x => x.MitigationDetailId == mitigation.MitigationDetailId);
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
                //await _context.SaveChangesAsync();
                return Created(research);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(research);
                //await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }

    }
}