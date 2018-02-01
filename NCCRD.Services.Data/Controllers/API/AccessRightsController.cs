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
    /// Manage AccessRights data
    /// </summary>
    public class AccessRightsController : ApiController
    {
        /// <summary>
        /// Get all AccessRights
        /// </summary>
        /// <returns>AccessRights data as JSON</returns>
        [HttpGet]
        [Route("api/AccessRights/GetAll")]
        public IEnumerable<AccessRight> GetAll()
        {
            List<AccessRight> accessRightsList = new List<AccessRight>();

            using (var context = new SQLDBContext())
            {
                accessRightsList = context.AccessRights.ToList();
            }

            return accessRightsList;
        }

        /// <summary>
        /// Get AccessRight by Id
        /// </summary>
        /// <param name="id">The Id of the AccessRight to get</param>
        /// <returns>AccessRight data as JSON</returns>
        [HttpGet]
        [Route("api/AccessRights/GetByID/{id}")]
        public AccessRight GetByID(int id)
        {
            AccessRight accessRight = null;

            using (var context = new SQLDBContext())
            {
                accessRight = context.AccessRights.FirstOrDefault(x => x.AccessRightId == id);
            }

            return accessRight;
        }

        /// <summary>
        /// Get AccessRight by RoleName
        /// </summary>
        /// <param name="roleName">The RoleName of the AccessRight to get</param>
        /// <returns>AccessRight data as JSON</returns>
        [HttpGet]
        [Route("api/AccessRights/GetByRoleName/{roleName}")]
        public AccessRight GetByTitle(string roleName)
        {
            AccessRight accessRight = null;

            using (var context = new SQLDBContext())
            {
                accessRight = context.AccessRights.FirstOrDefault(x => x.UserRole.RoleName == roleName);
            }

            return accessRight;
        }

        /// <summary>
        /// Add AccessRight
        /// </summary>
        /// <param name="accessRight">The AccessRight to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AccessRights/Add")]
        public bool Add([FromBody]AccessRight accessRight)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if(context.AccessRights.Count(x => x.AccessRightId == accessRight.AccessRightId || (x.SitePage == accessRight.SitePage && x.UserRole == accessRight.UserRole)) == 0)
                {
                    context.AccessRights.Add(accessRight);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update AccessRight
        /// </summary>
        /// <param name="accessRight">AccessRight to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AccessRights/Update")]
        public bool Update([FromBody]AccessRight accessRight)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var existAccessRight = context.AccessRights.FirstOrDefault(x => x.AccessRightId == accessRight.AccessRightId || (x.SitePage == accessRight.SitePage && x.UserRole == accessRight.UserRole));

                if (existAccessRight != null)
                {
                    //Update
                    existAccessRight.AllowRead = accessRight.AllowRead;
                    existAccessRight.AllowAdd = accessRight.AllowAdd;
                    existAccessRight.AllowUpdate = accessRight.AllowUpdate;
                    existAccessRight.AllowDelete = accessRight.AllowDelete;
                    existAccessRight.UserRoleId = accessRight.UserRoleId;
                    existAccessRight.SitePageId = accessRight.SitePageId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete AccessRight
        /// </summary>
        /// <param name="accessRight">AccessRight to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AccessRights/Delete")]
        public bool Delete([FromBody]AccessRight accessRight)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check is exist
                var existAccessRight = context.AccessRights.FirstOrDefault(x => x.AccessRightId == accessRight.AccessRightId || (x.SitePage == accessRight.SitePage && x.UserRole == accessRight.UserRole));
                if (existAccessRight != null)
                {
                    //Delete
                    context.AccessRights.Remove(existAccessRight);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete AccessRight by Id
        /// </summary>
        /// <param name="id">Id of AccessRight to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/AccessRights/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check is exists
                var existAccessRight = context.AccessRights.FirstOrDefault(x => x.AccessRightId == id);
                if (existAccessRight != null)
                {
                    //Delete
                    context.AccessRights.Remove(existAccessRight);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}