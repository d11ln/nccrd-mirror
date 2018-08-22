using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.Database.Models
{
    [Table("OptionFunder")]
    public class OptionFunder
    {
        public int OptionFunderId { get; set; }

        //FK - Funder
        [Required]
        public int FunderId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Funder Funder { get; set; }

        //FK - MAOption
        [Required]
        public int MAOptionId { get; set; }
        [Required]
        [IgnoreDataMember]
        public MAOption MAOption { get; set; }
    }
}
