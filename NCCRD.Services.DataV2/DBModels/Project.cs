using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("Project")]
    public class Project
    {
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(450)]
        //[Index("ProjectTitleIndex", IsUnique = true)]
        public string ProjectTitle { get; set; }

        public string ProjectDescription { get; set; }

        [Required]
        [MaxLength(450)]
        public string LeadAgent { get; set; }

        [MaxLength(450)]
        public string HostPartner { get; set; }

        [Required]
        [MaxLength(450)]
        public string HostOrganisation { get; set; }

        public int StartYear { get; set; }

        public int EndYear { get; set; }  

        public bool? ReminderSent { get; set; } //Not sure if this is used anywhere

        [MaxLength(450)]
        public string AlternativeContact { get; set; }

        [MaxLength(450)]
        public string AlternativeContactEmail { get; set; }

        [MaxLength(450)]
        public string Link { get; set; }

        public string ValidationComments { get; set; }

        public decimal? BudgetLower { get; set; }

        public decimal? BudgetUpper { get; set; }

        //FK - ProjectType
        [Required]
        public int ProjectTypeId { get; set; }
        [Required]
        [IgnoreDataMember]
        public ProjectType ProjectType { get; set; }

        //FK - ProjectSubType
        public int? ProjectSubTypeId { get; set; }
        [IgnoreDataMember]
        public ProjectSubType ProjectSubType { get; set; } //Optional

        //FK - ProjectStatus
        [Required]
        public int ProjectStatusId { get; set; }
        [Required]
        [IgnoreDataMember]
        public ProjectStatus ProjectStatus { get; set; }

        //FK - ProjectManager
        [Required]
        [ForeignKey("ProjectManager")]
        public int ProjectManagerId { get; set; }
        [Required]
        [IgnoreDataMember]
        public User ProjectManager { get; set; }

        //FK - ValidationStatus
        public int? ValidationStatusId { get; set; }
        [IgnoreDataMember]
        public ValidationStatus ValidationStatus { get; set; } //Optional

        //FK - MAOption
        public int? MAOptionId { get; set; }
        [IgnoreDataMember]
        public MAOption MAOption { get; set; } //Optional

        public virtual ICollection<ProjectRegion> ProjectRegions { get; set; }
        public virtual ICollection<AdaptationDetail> AdaptationDetails { get; set; }
        public virtual ICollection<MitigationDetail> MitigationDetails { get; set; }
        public virtual ICollection<ResearchDetail> ResearchDetails { get; set; }
    }
}
