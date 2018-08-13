using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("ProjectSubType")]
    public class ProjectSubType
    {
        public int ProjectSubTypeId { get; set; }

        [Required]
        [MaxLength(450)]
        public string Value { get; set; }

        public string Description { get; set; }

        //FK - ProjectType
        [Required]
        public int ProjectTypeId { get; set; }
        [Required]
        [IgnoreDataMember]
        public ProjectType ProjectType { get; set; }
    }
}
