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
    [Table("Users")]
    public class User
    {
        public int UserId { get; set; }

        [Required]
        [MaxLength(450)]
        public string EmailAddress { get; set; }

        [Required]
        [MaxLength(450)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(450)]
        public string Surname { get; set; }

        [Required]
        [MaxLength(450)]
        public string Organisation { get; set; }

        [MaxLength(450)]
        public string PhoneNumber { get; set; }

        [MaxLength(450)]
        public string MobileNumber { get; set; }
    }
}
