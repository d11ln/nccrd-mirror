using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.Database.Models
{
    [Table("ProjectRegion")]
    public class ProjectRegion
    {
        public int ProjectRegionId { get; set; }

        //FK - Project
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Project Project { get; set; }

        //FK - Region
        [Required]
        public int RegionId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Region Region { get; set; }
    }
}
