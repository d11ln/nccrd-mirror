using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ResearchType")]
    public class ResearchType
    {
        public int ResearchTypeId { get; set; }

        [Required]
        public string Value { get; set; }

        public string Description { get; set; }

        public ICollection<ResearchDetail> ResearchDetails { get; set; }
    }
}
