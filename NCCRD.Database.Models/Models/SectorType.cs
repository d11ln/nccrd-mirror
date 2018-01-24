using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("SectorType")]
    public class SectorType
    {
        public int SectorTypeId { get; set; }

        [Required]
        public string Name { get; set; }

        //public ICollection<Sector> Sectors { get; set; }
    }
}
