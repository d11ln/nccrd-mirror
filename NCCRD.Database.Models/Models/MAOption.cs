using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("MAOptions")]
    public class MAOption
    {
        public int MAOptionId { get; set; }

        //FK - Feasibility
        public int FeasibilityId { get; set; }
        [Required]
        public Feasibility Feasibility { get; set; }

        //FK - Hazard
        public int HazardId { get; set; }
        [Required]
        public Hazard Hazard { get; set; }

        //FK - Sector
        public int SectorId { get; set; }
        [Required]
        public Sector Sector { get; set; }
    }
}
