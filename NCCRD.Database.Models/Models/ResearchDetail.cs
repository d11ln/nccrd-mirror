using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ResearchDetails")]
    public class ResearchDetail
    {
        public int ResearchDetailId { get; set; }

        [Required]
        public string Author { get; set; }

        public string PaperLink { get; set; } //Optional

        [Required]
        public ResearchType ResearchType { get; set; }

        [Required]
        public TargetAudience TargetAudience { get; set; }

        [Required]
        public Project Project { get; set; }

        public Sector Sector { get; set; }
    }
}
