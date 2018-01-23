using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Stocks")]
    public class Stock
    {
        public int StockId { get; set; }

        public ICollection<Hazard> Hazards { get; set; }
    }
}
