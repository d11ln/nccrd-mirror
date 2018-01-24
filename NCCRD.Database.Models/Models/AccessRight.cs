using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
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
        public int UserRoleId { get; set; }
        [Required]
        public UserRole UserRole { get; set; }

        //FK - SitePage
        public int SitePageId { get; set; }
        [Required]
        public SitePage SitePage { get; set; }
    }
}
