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

        //FK - ProjectType
        public int ProjectTypeId { get; set; }
        [Required]
        public ProjectType ProjectType { get; set; }

        //FK - ProjectSubType
        public int? ProjectSubTypeId { get; set; }
        public ProjectSubType ProjectSubType { get; set; } //Optional

        //FK - ProjectStatus
        public int ProjectStatusId { get; set; }
        [Required]
        public ProjectStatus ProjectStatus { get; set; }

        //FK - ProjectManager
        [ForeignKey("ProjectManager")]
        public int ProjectManagerId { get; set; }
        [Required]
        public User ProjectManager { get; set; }

        //FK - ValidationStatus
        public int? ValidationStatusId { get; set; }
        public ValidationStatus ValidationStatus { get; set; } //Optional

        //FK - MAOption
        public int? MAOptionId { get; set; }
        public MAOption MAOption { get; set; } //Optional
    }
}
