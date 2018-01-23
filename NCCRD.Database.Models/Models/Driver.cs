using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Drivers")]
    public class Driver
    {
        public int DriverId { get; set; }

        public ICollection<Hazard> Hazards { get; set; }
    }
}
