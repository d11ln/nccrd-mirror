using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("Stocks")]
    public class Stock
    {
        public int StockId { get; set; }
    }
}
