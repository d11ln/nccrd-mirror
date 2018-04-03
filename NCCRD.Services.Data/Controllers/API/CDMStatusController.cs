using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage CDMStatus data
    /// </summary>
    public class CDMStatusController : ApiController
    {
        /// <summary>
        /// Get all CDMStatus data
        /// </summary>
        /// <returns>CDMStatus data as JSON</returns>
        [HttpGet]
        [Route("api/CDMStatus/GetAll")]
        public IEnumerable<CDMStatus> GetAll()
        {
            List<CDMStatus> data = new List<CDMStatus>();

            using (var context = new SQLDBContext())
            {
                data = context.CDMStatus
                    .OrderBy(x => x.Value.Trim())
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update CDMStatus
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMStatus/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<CDMStatus> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.CDMStatus.FirstOrDefault(x => x.CDMStatusId == item.CDMStatusId);
                    if (data != null)
                    {
                        //Update CDMStatus entry
                        data.Value = item.Value;
                        data.Description = item.Description;
                    }
                    else
                    {
                        //Add CDMStatus entry
                        context.CDMStatus.Add(item);
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete CDMStatus by Id
        /// </summary>
        /// <param name="id">Id of CDMStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/CDMStatus/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CDMStatus.FirstOrDefault(x => x.CDMStatusId == id);
                if (data != null)
                {
                    context.CDMStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}