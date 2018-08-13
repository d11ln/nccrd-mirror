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
    [Table("Region")]
    public class Region
    {
        public int RegionId { get; set; }

        [Required]
        [MaxLength(450)]
        public string RegionName { get; set; }

        public string RegionDesription { get; set; }

        //FK - LocationType
        [Required]
        public int LocationTypeId { get; set; }
        [Required]
        [IgnoreDataMember]
        public LocationType LocationType { get; set; }

        //FK - ParentRegion
        [ForeignKey("ParentRegion")]
        public int? ParentRegionId { get; set; }
        [IgnoreDataMember]
        public Region ParentRegion { get; set; }
    }
}
