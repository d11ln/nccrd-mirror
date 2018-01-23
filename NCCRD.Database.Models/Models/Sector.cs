using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Sector")]
    public class Sector
    {
        public int SectorId { get; set; }

        [Required]
        public string Value { get; set; }

        [Required]
        public SectorType SectorType { get; set; }

        public Sector ParentSector { get; set; }

        public Typology Typology { get; set; }

        public ICollection<MitigationDetail> MitigationDetails { get; set; }
        public ICollection<AdaptationDetail> AdaptationDetails { get; set; }
        public ICollection<ResearchDetail> ResearchDetails { get; set; }
        public ICollection<MAOption> MAOptions { get; set; }
    }
}
