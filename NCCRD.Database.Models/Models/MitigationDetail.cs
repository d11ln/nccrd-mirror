using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("MitigationDetails")]
    public class MitigationDetail
    {
        public int MitigationDetailId { get; set; }

        //MitigationDetails
        [Required]
        public CarbonCredit CarbonCredit { get; set; }

        public CarbonCreditMarket CarbonCreditMarket { get; set; }

        public CDMStatus CDMStatus { get; set; }

        public CDMMethodology CDMMethodology { get; set; }

        public VoluntaryMethodology VoluntaryMethodology { get; set; }

        public VoluntaryGoldStandard VoluntaryGoldStandard { get; set; }

        public int? VCS { get; set; } //No idea what this is for
        public int? Other { get; set; } //No idea what this is for
        public string OtherDescription { get; set; } //No idea what this is for
        public string CDMProjectNumber { get; set; } //Don't know what this links to

        [Required]
        public Project Project { get; set; }

        public Sector Sector { get; set; }
    }
}
