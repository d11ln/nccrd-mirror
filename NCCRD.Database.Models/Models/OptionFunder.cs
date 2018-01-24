using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("OptionFunder")]
    public class OptionFunder
    {
        public int OptionFunderId { get; set; }

        //FK - Funder
        public int FunderId { get; set; }
        [Required]
        public Funder Funder { get; set; }

        //FK - MAOption
        public int MAOptionId { get; set; }
        [Required]
        public MAOption MAOption { get; set; }
    }
}
