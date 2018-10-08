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
        [Range(0, int.MaxValue, ErrorMessage = "The SectorType field is required.")]
        public int SectorTypeId { get; set; }
        [IgnoreDataMember]
        public SectorType SectorType { get; set; }

        //FK - ParentSector
        [ForeignKey("ParentSector")]
        public int? ParentSectorId { get; set; }
        [IgnoreDataMember]
        public Sector ParentSector { get; set; }

        //FK - Typology
        //public int? TypologyId { get; set; }
        //[IgnoreDataMember]
        //public Typology Typology { get; set; }

        /*    
        Note:

            I removed Typology from Sector as this did not make sense to me any more.

            Instead I now filter Typology based on wether a Project has any Adaptations/Mitigation/Research attached to it.

            I did this for two reasons,
            1) With Typology determined by Sector, the Project could be placed in the wrong Typology by an inaccurate Sector allocation.
            2) We have no Sector that are linked to Research typology, thus filtering on Typology=Research could not work, with the new 
               approach this now works.      
        */
    }
}
