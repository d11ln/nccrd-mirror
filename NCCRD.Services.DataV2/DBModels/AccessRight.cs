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
    [Table("AccessRights")]
    public class AccessRight
    {
        public int AccessRightId { get; set; }

        [Required]
        public bool AllowRead { get; set; }

        [Required]
        public bool AllowAdd { get; set; }

        [Required]
        public bool AllowUpdate { get; set; }

        [Required]
        public bool AllowDelete { get; set; }

        //FK - UserRole
        [Required]
        public int UserRoleId { get; set; }
        [Required]
        [IgnoreDataMember]
        public UserRole UserRole { get; set; }

        //FK - SitePage
        [Required]
        public int SitePageId { get; set; }
        [Required]
        [IgnoreDataMember]
        public SitePage SitePage { get; set; }
    }
}
