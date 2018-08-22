using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.Database.Models
{
    [Table("Sector")]
    public class Sector
    {
        public int SectorId { get; set; }

        [Required]
        [MaxLength(450)]
        public string Value { get; set; }

        //FK - SectorType
        [Required]
        public int SectorTypeId { get; set; }
        [Required]
        [IgnoreDataMember]
        public SectorType SectorType { get; set; }

        //FK - ParentSector
        [ForeignKey("ParentSector")]
        public int? ParentSectorId { get; set; }
        [IgnoreDataMember]
        public Sector ParentSector { get; set; }

        //FK - Typology
        public int? TypologyId { get; set; }
        [IgnoreDataMember]
        public Typology Typology { get; set; }
    }
}
