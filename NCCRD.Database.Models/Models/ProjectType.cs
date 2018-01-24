using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ProjectType")]
    public class ProjectType
    {
        public int ProjectTypeId { get; set; }

        [Required]
        public string Value { get; set; }

        public string Description { get; set; }

        //public virtual ICollection<ProjectSubType> ProjectSubTypes { get; set; }
        //public virtual ICollection<Project> Projects { get; set; }
    }
}
