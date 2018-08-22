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
        [Range(1, int.MaxValue, ErrorMessage = "The AdaptationPurpose field is required.")]
        public int AdaptationPurposeId { get; set; }
        [IgnoreDataMember]
        public AdaptationPurpose AdaptationPurpose { get; set; }

        //FK - Project
        [Range(1, int.MaxValue, ErrorMessage = "The Project field is required.")]
        public int ProjectId { get; set; }
        [IgnoreDataMember]
        public Project Project { get; set; }

        //FK - Sector
        public int? SectorId { get; set; }
        public Sector Sector { get; set; }
    }
}
