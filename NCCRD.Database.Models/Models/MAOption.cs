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
    [Table("MAOptions")]
    public class MAOption
    {
        public int MAOptionId { get; set; }

        [Required]
        [MaxLength(450)]
        public string Name { get; set; }

        public string Description { get; set; }

        //FK - Feasibility
        [Required]
        public int FeasibilityId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Feasibility Feasibility { get; set; }

        //FK - Hazard
        [Required]
        public int HazardId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Hazard Hazard { get; set; }

        //FK - Sector
        [Required]
        public int SectorId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Sector Sector { get; set; }
    }
}
