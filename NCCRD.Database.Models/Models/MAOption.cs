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

        [Required]
        public Feasibility Feasibility { get; set; }

        [Required]
        public Hazard Hazard { get; set; }

        [Required]
        public Sector Sector { get; set; }

        //public ICollection<OptionFunder> OptionFunders { get; set; }
        //public ICollection<Project> Projects { get; set; }
        //public ICollection<OptionRegion> OptionRegions { get; set; }
    }
}
