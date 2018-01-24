using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ResearchDetails")]
    public class ResearchDetail
    {
        public int ResearchDetailId { get; set; }
        [Required]
        public string Author { get; set; }
        public string PaperLink { get; set; } //Optional

        //FK - ResearchType
        public int ResearchTypeId { get; set; }
        [Required]
        public ResearchType ResearchType { get; set; }

        //FK - TargetAudience
        public int TargetAudienceId { get; set; }
        [Required]
        public TargetAudience TargetAudience { get; set; }

        //FK - Project
        public int ProjectId { get; set; }
        [Required]
        public Project Project { get; set; }

        //FK - Sector
        public int? SectorId { get; set; }
        public Sector Sector { get; set; }
    }
}
