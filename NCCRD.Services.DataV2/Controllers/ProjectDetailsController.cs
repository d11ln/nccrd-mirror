using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCCRD.Services.DataV2.DBContexts;
using NCCRD.Services.DataV2.DBModels;
using NCCRD.Services.DataV2.ViewModels;

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [EnableCors("CORSPolicy")]
    [ODataRoutePrefix("ProjectDetails")]
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
            var project = _context.Project.FirstOrDefault(x => x.ProjectId == id);

            var adaptationDetails = _context.AdaptationDetails.Where(x => x.ProjectId == id);
            var mitigationDetails = _context.MitigationDetails.Where(x => x.ProjectId == id);
            var mitigationEmissionsData = _context.MitigationEmissionsData.Where(x => x.ProjectId == id);
            var researchDetails = _context.ResearchDetails.Where(x => x.ProjectId == id);

            var adaptationPurposes = _context.AdaptationPurpose;
            var carbonCredits = _context.CarbonCredit;
            var carbonCreditMarkets = _context.CarbonCreditMarket;
            var cdmMethodologies = _context.CDMMethodology;
            var cdmStatuses = _context.CDMStatus;
            var projectStatuses = _context.ProjectStatus;
            var projectSubTypes = _context.ProjectSubType;
            var projectTypes = _context.ProjectType;
            var researchTypes = _context.ResearchType;
            var sectors = _context.Sector;
            var sectorTypes = _context.SectorType;
            var targetAudiences = _context.TargetAudience;
            var typologies = _context.Typology;
            var users = _context.Users;
            var validationStatuses = _context.ValidationStatus;
            var voluntaryGoldStandards = _context.VoluntaryGoldStandard;
            var voluntaryMethodologies = _context.VoluntaryMethodology;

            var result = new ProjectDetails()
            {
                ProjectDetailsId = id,
                Project = project,

                AdaptationDetails = adaptationDetails.ToList(),
                MitigationDetails = mitigationDetails.ToList(),
                MitigationEmissionsData = mitigationEmissionsData.ToList(),
                ResearchDetails = researchDetails.ToList(),

                AdaptationPurposes = adaptationPurposes.ToList(),
                CarbonCredits = carbonCredits.ToList(),
                CarbonCreditMarkets = carbonCreditMarkets.ToList(),
                CDMMethodologies = cdmMethodologies.ToList(),
                CDMStatuses = cdmStatuses.ToList(),
                ProjectStatuses = projectStatuses.ToList(),
                ProjectSubTypes = projectSubTypes.ToList(),
                ProjectTypes = projectTypes.ToList(),
                ResearchTypes = researchTypes.ToList(),
                Sectors = sectors.ToList(),
                SectorTypes = sectorTypes.ToList(),
                TargetAudiences = targetAudiences.ToList(),
                Typologies = typologies.ToList(),
                Users = users.ToList(),
                ValidationStatuses = validationStatuses.ToList(),
                VoluntaryGoldStandards = voluntaryGoldStandards.ToList(),
                VoluntaryMethodologies = voluntaryMethodologies.ToList()
            };

            return result;
        }
    }
}