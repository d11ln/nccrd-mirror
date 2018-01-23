using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ProjectFunder")]
    public class ProjectFunder
    {
        public int ProjectFunderId { get; set; }

        [Required]
        public Funder Funder { get; set; }

        [Required]
        public Project Project { get; set; }

        public FundingStatus FundingStatus { get; set; }
    }
}
