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
    [Table("Users")]
    public class User
    {
        public int UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [MaxLength(450)]
        public string Password { get; set; } //hashed value

        public bool? Blocked { get; set; }

        [Required]
        [MaxLength(450)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(450)]
        public string Surname { get; set; }

        [MaxLength(450)]
        public string JobTitle { get; set; }

        [Required]
        [MaxLength(450)]
        public string Organisation { get; set; }

        //Physical Address
        [MaxLength(450)]
        public string PhysicalAddressLine1 { get; set; }

        [MaxLength(450)]
        public string PhysicalAddressLine2 { get; set; }

        [MaxLength(450)]
        public string PhysicalAddressLine3 { get; set; }

        [MaxLength(450)]
        public string PhysicalAddressTown { get; set; }

        [MaxLength(450)]
        public string PhysicalAddressPostalCode { get; set; }

        [MaxLength(450)]
        public string PhysicalAddressProvince { get; set; } //Lookup against Region filtered to province

        [MaxLength(450)]
        public string PhysicalAddressCountry { get; set; } //Lookup against Country

        //Postal Address
        [MaxLength(450)]
        public string PostalAddressLine1 { get; set; }

        [MaxLength(450)]
        public string PostalAddressLine2 { get; set; }

        [MaxLength(450)]
        public string PostalAddressLine3 { get; set; }

        [MaxLength(450)]
        public string PostalAddressTown { get; set; }

        [MaxLength(450)]
        public string PostalAddressPostalCode { get; set; }

        [MaxLength(450)]
        public string PostalAddressProvince {get; set; } //Lookup against Region filtered to province

        [MaxLength(450)]
        public string PostalAddressCountry { get; set; } //Lookup against Country

        [MaxLength(450)]
        public string PhoneNumber { get; set; }

        [MaxLength(450)]
        public string MobileNumber { get; set; }

        [MaxLength(450)]
        public string FaxNumber { get; set; }

        //FK - UserRole
        [Required]
        public int UserRoleId { get; set; }
        [Required]
        [IgnoreDataMember]
        public UserRole UserRole { get; set; }

        //FK - Title
        [Required]
        public int TitleId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Title Title { get; set; }
    }
}
