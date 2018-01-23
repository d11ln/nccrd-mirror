using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ProjectRegion")]
    public class ProjectRegion
    {
        public int ProjectRegionId { get; set; }

        [Required]
        public Project Project { get; set; }

        [Required]
        public Region Region { get; set; }
    }
}
