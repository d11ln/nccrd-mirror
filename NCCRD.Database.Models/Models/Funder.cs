using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Funder")]
    public class Funder
    {
        public int FunderId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<ProjectFunder> ProjectFunders { get; set; }
        public ICollection<OptionFunder> OptionFunders { get; set; }
    }
}
