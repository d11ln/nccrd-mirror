using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace NCCRD.Services.Data.Models
{
    // Models used as parameters to AccountController actions.

    public class AddExternalLoginBindingModel
    {
        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }
    }

    public class ChangePasswordBindingModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class RegisterBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Surname")]
        public string Surname { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Job Title")]
        public string JobTitle { get; set; }

        [Required]
        [Display(Name = "Organisation")]
        public string Organisation { get; set; }

        //Physical Address
        [Display(Name = "Address (Line 1)")]
        public string PhysicalAddressLine1 { get; set; }

        [Display(Name = "Address (Line 2)")]
        public string PhysicalAddressLine2 { get; set; }

        [Display(Name = "Address (Line 3)")]
        public string PhysicalAddressLine3 { get; set; }

        [Display(Name = "Town")]
        public string PhysicalAddressTown { get; set; }

        [Display(Name = "Postal Code")]
        public string PhysicalAddressPostalCode { get; set; }

        [Display(Name = "Province")]
        public string PhysicalAddressProvince { get; set; } //Lookup against Region filtered to province

        [Display(Name = "Country")]
        public string PhysicalAddressCountry { get; set; } //Lookup against Country

        //Postal Address
        [Display(Name = "Address (Line 1)")]
        public string PostalAddressLine1 { get; set; }

        [Display(Name = "Address (Line 2)")]
        public string PostalAddressLine2 { get; set; }

        [Display(Name = "Address (Line 3)")]
        public string PostalAddressLine3 { get; set; }

        [Display(Name = "Town")]
        public string PostalAddressTown { get; set; }

        [Display(Name = "Postal Code")]
        public string PostalAddressPostalCode { get; set; }

        [Display(Name = "Province")]
        public string PostalAddressProvince { get; set; } //Lookup against Region filtered to province

        [Display(Name = "Country")]
        public string PostalAddressCountry { get; set; } //Lookup against Country

        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }

        [Display(Name = "Moblie Number")]
        public string MobileNumber { get; set; }

        [Display(Name = "Fax Number")]
        public string FaxNumber { get; set; }
    }

    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class RemoveLoginBindingModel
    {
        [Required]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [Required]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }
    }

    public class SetPasswordBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginBindingModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        [Display(Name = "Remember Me")]
        public bool RememberMe { get; set; }
    }
}
