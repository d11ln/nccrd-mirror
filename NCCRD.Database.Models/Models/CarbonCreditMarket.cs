using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("CarbonCreditMarket")]
    public class CarbonCreditMarket
    {
        public int CarbonCreditMarketId { get; set; }

        [Required]
        public string Value { get; set; }

        public string Description { get; set; }

        //public ICollection<MitigationDetail> MitigationDetails { get; set; }
    }
}
