using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Region")]
    public class Region
    {
        public int RegionId { get; set; }
        [Required]
        public string RegionName { get; set; }
        public string RegionDesription { get; set; }

        //FK - LocationType
        public int LocationTypeId { get; set; }
        [Required]
        public LocationType LocationType { get; set; }

        //FK - ParentRegion
        [ForeignKey("ParentRegion")]
        public int? ParentRegionID { get; set; }
        public Region ParentRegion { get; set; }
    }
}
