using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("MitigationDetails")]
    public class MitigationDetail
    {
        public int MitigationDetailId { get; set; }

        public int? VCS { get; set; } //No idea what this is for
        public int? Other { get; set; } //No idea what this is for
        public string OtherDescription { get; set; } //No idea what this is for

        [MaxLength(450)]
        public string CDMProjectNumber { get; set; } //Don't know what this links to

        //FK - CarbonCredit
        [Required]
        public int CarbonCreditId { get; set; }
        [Required]
        [IgnoreDataMember]
        public CarbonCredit CarbonCredit { get; set; }

        //FK - CarbonCreditMarket
        public int? CarbonCreditMarketId { get; set; }
        [IgnoreDataMember]
        public CarbonCreditMarket CarbonCreditMarket { get; set; }

        //FK - CDMStatus
        public int? CDMStatusId { get; set; }
        [IgnoreDataMember]
        public CDMStatus CDMStatus { get; set; }

        //FK - CDMMethodology
        public int? CDMMethodologyId { get; set; }
        [IgnoreDataMember]
        public CDMMethodology CDMMethodology { get; set; }

        //FK - VoluntaryMethodology
        public int? VoluntaryMethodologyId { get; set; }
        [IgnoreDataMember]
        public VoluntaryMethodology VoluntaryMethodology { get; set; }

        //FK - VoluntaryGoldStandard
        public int? VoluntaryGoldStandardId { get; set; }
        [IgnoreDataMember]
        public VoluntaryGoldStandard VoluntaryGoldStandard { get; set; }

        //FK - Project
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Project Project { get; set; }

        //FK - Sector
        public int? SectorId { get; set; }
        [IgnoreDataMember]
        public Sector Sector { get; set; }
    }
}
