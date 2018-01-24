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
    [Table("ResearchDetails")]
    public class ResearchDetail
    {
        public int ResearchDetailId { get; set; }

        [Required]
        [MaxLength(450)]
        public string Author { get; set; }

        [MaxLength(450)]
        public string PaperLink { get; set; } //Optional

        //FK - ResearchType
        [Required]
        public int ResearchTypeId { get; set; }
        [Required]
        [IgnoreDataMember]
        public ResearchType ResearchType { get; set; }

        //FK - TargetAudience
        [Required]
        public int TargetAudienceId { get; set; }
        [Required]
        [IgnoreDataMember]
        public TargetAudience TargetAudience { get; set; }

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
