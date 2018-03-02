using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage Users data
    /// </summary>
    public class AppUsrController : ApiController
    {
        /// <summary>
        /// Get all User data
        /// </summary>
        /// <returns>User data as JSON</returns>
        [HttpGet]
        [Route("api/AppUsr/GetAll")]
        public IEnumerable<User> GetAll()
        {
            List<User> data = new List<User>();

            using (var context = new SQLDBContext())
            {
                data = context.Users.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get all User basic data
        /// </summary>
        /// <returns>User data as JSON</returns>
        [HttpGet]
        [Route("api/AppUsr/GetAllBasic")]
        public IEnumerable<UserBasic> GetAllBasic()
        {
            List<UserBasic> data = new List<UserBasic>();

            using (var context = new SQLDBContext())
            {
                data = context.Users.
                    OrderBy(u => u.FirstName).
                    ThenBy(u => u.Surname).
                    Select(u => new UserBasic() { UserId = u.UserId, Username = u.Username, Firstname = u.FirstName, Surname = u.Surname}).
                    ToList();
            }

            return data;
        }

        /// <summary>
        /// Get User by Id
        /// </summary>
        /// <param name="id">The Id of the User to get</param>
        /// <returns>User data as JSON</returns>
        [HttpGet]
        [Route("api/AppUsr/GetByID/{id}")]
        public User GetByID(int id)
        {
            User data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Users.FirstOrDefault(x => x.UserId == id);
            }

            return data;
        }

        /// <summary>
        /// Get User by UserRoleId
        /// </summary>
        /// <param name="userRoleId">The UserRoleId of the User to get</param>
        /// <returns>User data as JSON</returns>
        [HttpGet]
        [Route("api/AppUsr/GetByUserRoleId/{userRoleId}")]
        public User GetByUserRoleId(int userRoleId)
        {
            User data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Users.FirstOrDefault(x => x.UserRoleId == userRoleId);
            }

            return data;
        }

        /*/// <summary>
        /// Add User
        /// </summary>
        /// <param name="user">The User to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AppUsr/Add")]
        public bool Add([FromBody]User user)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Users.Count(x => x.UserId == user.UserId) == 0)
                {
                    //Add Title entry
                    context.Users.Add(user);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update User
        /// </summary>
        /// <param name="user">User to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AppUsr/Update")]
        public bool Update([FromBody]User user)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Users.FirstOrDefault(x => x.UserId == user.UserId);
                if (data != null)
                {
                    //add properties to update here
                    data.Username = user.Username;
                    data.Password = user.Password;
                    data.Blocked = user.Blocked;
                    data.FirstName = user.FirstName;
                    data.Surname = user.Surname;
                    data.JobTitle = user.JobTitle;
                    data.Organisation = user.Organisation;
                    data.PhysicalAddressLine1 = user.PhysicalAddressLine1;
                    data.PhysicalAddressLine2 = user.PhysicalAddressLine2;
                    data.PhysicalAddressLine3 = user.PhysicalAddressLine3;
                    data.PhysicalAddressTown = user.PhysicalAddressTown;
                    data.PhysicalAddressPostalCode = user.PhysicalAddressPostalCode;
                    data.PhysicalAddressProvince = user.PhysicalAddressProvince;
                    data.PhysicalAddressCountry = user.PhysicalAddressCountry;
                    data.PostalAddressLine1 = user.PostalAddressLine1;
                    data.PostalAddressLine2 = user.PostalAddressLine2;
                    data.PostalAddressLine3 = user.PostalAddressLine3;
                    data.PostalAddressTown = user.PostalAddressTown;
                    data.PostalAddressPostalCode = user.PostalAddressPostalCode;
                    data.PostalAddressCountry = user.PostalAddressCountry;
                    data.PhoneNumber = user.PhoneNumber;
                    data.MobileNumber = user.MobileNumber;
                    data.FaxNumber = user.FaxNumber;
                    data.UserRoleId = user.UserRoleId;
                    data.TitleId = user.TitleId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete User
        /// </summary>
        /// <param name="user">User to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AppUsr/Delete")]
        public bool Delete([FromBody]User user)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Users.FirstOrDefault(x => x.UserId == user.UserId);
                if (data != null)
                {
                    context.Users.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete User by Id
        /// </summary>
        /// <param name="id">Id of User to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/AppUsr/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Users.FirstOrDefault(x => x.UserId == id);
                if (data != null)
                {
                    context.Users.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}