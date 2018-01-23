using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Typology")]
    public class Typology
    {
        public int TypologyID { get; set; }

        [Required]
        public string Value { get; set; }

        public ICollection<ProjectTypology> ProjectTypologies { get; set; }
        public ICollection<Sector> Sectors { get; set; }
    }
}
