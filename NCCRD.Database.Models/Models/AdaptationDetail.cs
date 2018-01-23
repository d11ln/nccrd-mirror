using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("AdaptationDetails")]
    public class AdaptationDetail
    {
        public int AdaptationDetailId { get; set; }

        [Required]
        public AdaptationPurpose AdaptationPurpose { get; set; }

        public string Description { get; set; } //Optional

        [Required]
        public Project Project { get; set; }

        public Sector Sector { get; set; }
    }
}
