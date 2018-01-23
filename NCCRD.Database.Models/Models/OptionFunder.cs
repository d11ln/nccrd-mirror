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

        [Required]
        public Funder Funder { get; set; }

        [Required]
        public MAOption MAOption { get; set; }
    }
}
