using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("ProjectLocation")]
    public class ProjectLocation
    {
        public int ProjectLocationId { get; set; }

        //FK - Project
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Project Project { get; set; }

        //FK - Location
        [Required]
        public int LocationId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Location Location { get; set; }
    }
}
