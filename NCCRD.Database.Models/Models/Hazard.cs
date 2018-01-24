using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Hazards")]
    public class Hazard
    {
        public int HazardId { get; set; }

        //FK - Driver
        public int DriverId { get; set; }
        [Required]
        public Driver Driver { get; set; }

        //FK - Stock
        public int StockId { get; set; }
        [Required]
        public Stock Stock { get; set; }
    }
}
