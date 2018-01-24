using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("LocationType")]
    public class LocationType
    {
        public int LocationTypeId { get; set; }

        [Required]
        [MaxLength(450)]
        public string Value { get; set; }
    }
}
