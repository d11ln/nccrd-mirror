using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ProjectTypology")]
    public class ProjectTypology
    {
        public int ProjectTypologyId { get; set; }

        //FK - Project
        public int ProjectId { get; set; }
        [Required]
        public Project Project { get; set; }

        //FK - Typology
        public int TypologyId { get; set; }
        [Required]
        public Typology Typology { get; set; }
    }
}
