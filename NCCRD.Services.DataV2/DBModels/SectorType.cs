using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("SectorType")]
    public class SectorType
    {
        public int SectorTypeId { get; set; }

        [Required]
        [MaxLength(450)]
        public string Name { get; set; }
    }
}
