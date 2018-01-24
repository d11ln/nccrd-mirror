using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("AdaptationPurpose")]
    public class AdaptationPurpose
    {
        public int AdaptationPurposeId { get; set; }

        [Required]
        public string Value { get; set; }

        public string Description { get; set; }

        //public ICollection<AdaptationDetail> AdaptationDetails { get; set; }
    }
}
