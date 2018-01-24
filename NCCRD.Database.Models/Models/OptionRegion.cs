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
    [Table("OptionRegion")]
    public class OptionRegion
    {
        public int OptionRegionId { get; set; }

        //FK - Region
        [Required]
        public int RegionId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Region Region { get; set; }

        //FK - MAOption
        [Required]
        public int MAOptionId { get; set; }
        [Required]
        [IgnoreDataMember]
        public MAOption MAOption { get; set; }
    }
}
