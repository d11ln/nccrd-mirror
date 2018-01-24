using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("UserRoles")]
    public class UserRole
    {
        public int UserRoleId { get; set; }

        [Required]
        public string RoleName { get; set; }

        //public ICollection<User> Users { get; set; }
        //public ICollection<AccessRight> AccessRights { get; set; }
    }
}
