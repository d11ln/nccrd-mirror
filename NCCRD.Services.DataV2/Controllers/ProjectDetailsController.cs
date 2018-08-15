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

            var adaptationDetails = _context.AdaptationDetails.Where(x => x.ProjectId == id).OrderBy(x => x.AdaptationPurposeId);
            var mitigationDetails = _context.MitigationDetails.Where(x => x.ProjectId == id).OrderBy(x => x.MitigationDetailId);
            var mitigationEmissionsData = _context.MitigationEmissionsData.Where(x => x.ProjectId == id).OrderBy(x => x.MitigationEmissionsDataId);
            var researchDetails = _context.ResearchDetails.Where(x => x.ProjectId == id).OrderBy(x => x.ResearchDetailId);

            var adaptationPurposes = _context.AdaptationPurpose.OrderBy(x => x.Value);
            var carbonCredits = _context.CarbonCredit.OrderBy(x => x.Value);
            var carbonCreditMarkets = _context.CarbonCreditMarket.OrderBy(x => x.Value);
            var cdmMethodologies = _context.CDMMethodology.OrderBy(x => x.Value);
            var cdmStatuses = _context.CDMStatus.OrderBy(x => x.Value);
            var projectStatuses = _context.ProjectStatus.OrderBy(x => x.Value);
            var projectSubTypes = _context.ProjectSubType.OrderBy(x => x.Value);
            var projectTypes = _context.ProjectType.OrderBy(x => x.Value);
            var researchTypes = _context.ResearchType.OrderBy(x => x.Value);
            var sectors = _context.Sector.OrderBy(x => x.Value);
            var sectorTypes = _context.SectorType.OrderBy(x => x.Name);
            var targetAudiences = _context.TargetAudience.OrderBy(x => x.Value);
            var typologies = _context.Typology.OrderBy(x => x.Value);
            var users = _context.Users.OrderBy(u => u.FirstName).ThenBy(u => u.Surname).Select(u => new UserBasic() { UserId = u.UserId, Username = u.Username, Firstname = u.FirstName, Surname = u.Surname, Value = $"{u.FirstName} {u.Surname}" });
            var validationStatuses = _context.ValidationStatus.OrderBy(x => x.Value);
            var voluntaryGoldStandards = _context.VoluntaryGoldStandard.OrderBy(x => x.Value);
            var voluntaryMethodologies = _context.VoluntaryMethodology.OrderBy(x => x.Value);

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