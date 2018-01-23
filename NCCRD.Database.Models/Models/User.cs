using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("Users")]
    public class User
    {
        public int UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; } //hashed value

        public bool? Blocked { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string JobTitle { get; set; }

        [Required]
        public string Organisation { get; set; }


        //Physical Address//

        [Required]
        public string PhysicalAddressLine1 { get; set; }

        [Required]
        public string PhysicalAddressLine2 { get; set; }

        public string PhysicalAddressLine3 { get; set; }

        [Required]
        public string PhysicalAddressTown { get; set; }

        [Required]
        public string PhysicalAddressPostalCode { get; set; }

        [Required]
        public string PhysicalAddressProvince { get; set; } //Lookup again Region filtered to province

        [Required]
        public string PhysicalAddressCountry { get; set; } //Lookup agains Country

        //Postal Address//

        [Required]
        public string PostalAddressLine1 { get; set; }

        [Required]
        public string PostalAddressLine2 { get; set; }

        public string PostalAddressLine3 { get; set; }

        [Required]
        public string PostalAddressTown { get; set; }

        [Required]
        public string PostalAddressPostalCode { get; set; }

        [Required]
        public string PostalAddressProvince {get; set; } //Lookup again Region filtered to province

        [Required]
        public string PostalAddressCountry { get; set; } //Lookup agains Country

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        public string FaxNumber { get; set; }

        [Required]
        public UserRole UserRole { get; set; }

        [Required]
        public Title Title { get; set; }

        public ICollection<Project> Projects { get; set; }
        public ICollection<AppLog> AppLogs { get; set; }
        public ICollection<ChangeLog> ChangeLogs { get; set; }
    }
}
