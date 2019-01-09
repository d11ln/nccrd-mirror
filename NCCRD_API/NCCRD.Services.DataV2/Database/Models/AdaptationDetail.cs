using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.Database.Models
{
    [Table("AdaptationDetails")]
    public class AdaptationDetail
    {
        public int AdaptationDetailId { get; set; }

        public string Description { get; set; } //Optional

        public bool IsResearch { get; set; }

        //FK - AdaptationPurpose
        [Range(0, int.MaxValue, ErrorMessage = "The AdaptationPurpose field is required.")]
        public int AdaptationPurposeId { get; set; }
        public AdaptationPurpose AdaptationPurpose { get; set; }

        //FK - External - VMS Hazards Vocabualry
        public int? HazardId { get; set; }

        //FK - Project
        [Range(0, int.MaxValue, ErrorMessage = "The Project field is required.")]
        public int ProjectId { get; set; }
        public Project Project { get; set; }

        //FK - Sector
        public int? SectorId { get; set; }

        //FK - ProjectStatus
        [Range(0, int.MaxValue, ErrorMessage = "The ProjectStatus field is required.")]
        public int ProjectStatusId { get; set; }
        public ProjectStatus ProjectStatus { get; set; }

        //FK - ResearchDetail
        //public int? ResearchDetailId { get; set; }
        public ResearchDetail ResearchDetail { get; set; }
    }
}
