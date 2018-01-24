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

        //FK - SectorType
        public int SectorTypeId { get; set; }
        [Required]
        public SectorType SectorType { get; set; }

        //FK - ParentSector
        [ForeignKey("ParentSector")]
        public int? ParentSectorID { get; set; }
        public Sector ParentSector { get; set; }

        //FK - Typology
        public int? TypologyId { get; set; }
        public Typology Typology { get; set; }
    }
}
