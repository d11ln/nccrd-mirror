using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage UserRoles data
    /// </summary>
    public class UserRolesController : ApiController
    {
        /// <summary>
        /// Get all UserRole data
        /// </summary>
        /// <returns>UserRole data as JSON</returns>
        [HttpGet]
        [Route("api/UserRoles/GetAll")]
        public IEnumerable<UserRole> GetAll()
        {
            List<UserRole> data = new List<UserRole>();

            using (var context = new SQLDBContext())
            {
                data = context.UserRoles.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get UserRole by Id
        /// </summary>
        /// <param name="id">The Id of the UserRole to get</param>
        /// <returns>UserRole data as JSON</returns>
        [HttpGet]
        [Route("api/UserRoles/GetByID/{id}")]
        public UserRole GetByID(int id)
        {
            UserRole data = null;

            using (var context = new SQLDBContext())
            {
                data = context.UserRoles.FirstOrDefault(x => x.UserRoleId == id);
            }

            return data;
        }

        /// <summary>
        /// Get UserRoles by RoleName
        /// </summary>
        /// <param name="roleName">The RoleName of the UserRoles to get</param>
        /// <returns>UserRoles data as JSON</returns>
        [HttpGet]
        [Route("api/UserRoles/GetByRoleName/{roleName}")]
        public UserRole GetByRoleName(string roleName)
        {
            UserRole data = null;

            using (var context = new SQLDBContext())
            {
                data = context.UserRoles.FirstOrDefault(x => x.RoleName == roleName);
            }

            return data;
        }

        /// <summary>
        /// Add UserRole
        /// </summary>
        /// <param name="userRole">The UserRole to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/UserRoles/Add")]
        public bool Add([FromBody]UserRole userRole)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.UserRoles.Count(x => x.UserRoleId == userRole.UserRoleId) == 0)
                {
                    //Add Title entry
                    context.UserRoles.Add(userRole);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update UserRole
        /// </summary>
        /// <param name="userRole">UserRole to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/UserRoles/Update")]
        public bool Update([FromBody]UserRole userRole)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.UserRoles.FirstOrDefault(x => x.UserRoleId == userRole.UserRoleId);
                if (data != null)
                {
                    //add properties to update here
                    data.RoleName = userRole.RoleName;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete UserRole
        /// </summary>
        /// <param name="userRole">UserRole to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/UserRoles/Delete")]
        public bool Delete([FromBody]UserRole userRole)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.UserRoles.FirstOrDefault(x => x.UserRoleId == userRole.UserRoleId);
                if (data != null)
                {
                    context.UserRoles.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete UserRole by Id
        /// </summary>
        /// <param name="id">Id of UserRole to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/UserRoles/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.UserRoles.FirstOrDefault(x => x.UserRoleId == id);
                if (data != null)
                {
                    context.UserRoles.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}