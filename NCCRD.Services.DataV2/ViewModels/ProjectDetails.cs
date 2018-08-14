using NCCRD.Services.DataV2.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.ViewModels
{
    public class ProjectDetails
    {
        public int ProjectDetailsId { get; set; }

        public Project Project { get; set; }

        public List<AdaptationDetail> AdaptationDetails { get; set; }
        public List<MitigationDetail> MitigationDetails { get; set; }
        public List<MitigationEmissionsData> MitigationEmissionsData { get; set; }
        public List<ResearchDetail> ResearchDetails { get; set; }

        public List<AdaptationPurpose> AdaptationPurposes { get; set; }
        public List<CarbonCredit> CarbonCredits { get; set; }
        public List<CarbonCreditMarket> CarbonCreditMarkets { get; set; }
        public List<CDMMethodology> CDMMethodologies { get; set; }
        public List<CDMStatus> CDMStatuses { get; set; }
        public List<ProjectStatus> ProjectStatuses { get; set; }
        public List<ProjectSubType> ProjectSubTypes { get; set; }
        public List<ProjectType> ProjectTypes { get; set; }
        public List<ResearchType> ResearchTypes { get; set; }
        public List<Sector> Sectors { get; set; }
        public List<SectorType> SectorTypes { get; set; }
        public List<TargetAudience> TargetAudiences { get; set; }
        public List<Typology> Typologies { get; set; }
        public List<User> Users { get; set; }
        public List<ValidationStatus> ValidationStatuses { get; set; }
        public List<VoluntaryGoldStandard> VoluntaryGoldStandards { get; set; }
        public List<VoluntaryMethodology> VoluntaryMethodologies { get; set; }
    }
}
