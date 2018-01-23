using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Project")]
    public class Project
    {
        public int ProjectId { get; set; }

        [Required]
        public string ProjectTitle { get; set; }

        public string ProjectDescription { get; set; }

        [Required]
        public string LeadAgent { get; set; }

        public string HostPartner { get; set; }

        [Required]
        public string HostOrganisation { get; set; }

        [Required]
        public int StartYear { get; set; }

        [Required]
        public int EndYear { get; set; } 
        
        public bool? ReminderSent { get; set; } //Not sure if this is used anywhere

        public string AlternativeContact { get; set; }
        public string AlternativeContactEmail { get; set; }
        public string Link { get; set; }
        public string ValidationComments { get; set; }
        public decimal? BudgetLower { get; set; }
        public decimal? BudgetUpper { get; set; }

        [Required]
        public ProjectType ProjectType { get; set; }

        public ProjectSubType ProjectSubType { get; set; } //Optional
   
        [Required]
        public ProjectStatus ProjectStatus { get; set; }

        [Required]
        public User ProjectManager { get; set; }

        public ValidationStatus ValidationStatus { get; set; } //Optional

        public MAOption MAOption { get; set; } //Optional

        public ICollection<AdaptationDetail> AdaptationDetails { get; set; }
        public ICollection<MitigationDetail> MitigationDetails { get; set; }
        public ICollection<MitigationEmissionsData> MitigationEmissionsData { get; set; }
        public ICollection<ResearchDetail> ResearchDetails { get; set; }
        public ICollection<ProjectTypology> ProjectTypologies { get; set; }
        public ICollection<ProjectFunder> ProjectFunders { get; set; }
        public ICollection<ProjectRegion> ProjectRegions { get; set; }
        public ICollection<ProjectLocation> ProjectLocations { get; set; }
    }
}
