using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ProjectLocation")]
    public class ProjectLocation
    {
        public int ProjectLocationId { get; set; }

        //FK - Project
        public int ProjectId { get; set; }
        [Required]
        public Project Project { get; set; }

        //FK - Location
        public int LocationId { get; set; }
        [Required]
        public Location Location { get; set; }
    }
}
