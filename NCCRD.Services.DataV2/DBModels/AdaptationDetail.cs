using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("AdaptationDetails")]
    public class AdaptationDetail
    {
        public int AdaptationDetailId { get; set; }

        public string Description { get; set; } //Optional

        //FK - AdaptationPurpose
        [Required]
        public int AdaptationPurposeId { get; set; }
        [Required]
        [IgnoreDataMember]
        public AdaptationPurpose AdaptationPurpose { get; set; }

        //FK - Project
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Project Project { get; set; }

        //FK - Sector
        public int? SectorId { get; set; }
        //[IgnoreDataMember]
        public Sector Sector { get; set; }
    }
}
