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
    [Table("Hazards")]
    public class Hazard
    {
        public int HazardId { get; set; }

        //FK - Driver
        [Required]
        public int DriverId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Driver Driver { get; set; }

        //FK - Stock
        [Required]
        public int StockId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Stock Stock { get; set; }
    }
}
