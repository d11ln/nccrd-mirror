using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
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
                data = context.CDMStatus.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get CDMStatus by Id
        /// </summary>
        /// <param name="id">The Id of the CDMStatus to get</param>
        /// <returns>CDMStatus data as JSON</returns>
        [HttpGet]
        [Route("api/CDMStatus/GetByID/{id}")]
        public CDMStatus GetByID(int id)
        {
            CDMStatus data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CDMStatus.FirstOrDefault(x => x.CDMStatusId == id);
            }

            return data;
        }

        /// <summary>
        /// Add CDMStatus
        /// </summary>
        /// <param name="cdmStatus">The CDMStatus to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMStatus/Add")]
        public bool Add([FromBody]CDMStatus cdmStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.CDMStatus.Count(x => x.CDMStatusId == cdmStatus.CDMStatusId) == 0)
                {
                    //Add CDMStatus entry
                    context.CDMStatus.Add(cdmStatus);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update CDMStatus
        /// </summary>
        /// <param name="cdmStatus">CDMStatus to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMStatus/Update")]
        public bool Update([FromBody]CDMStatus cdmStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CDMStatus.FirstOrDefault(x => x.CDMStatusId == cdmStatus.CDMStatusId);
                if (data != null)
                {
                    data.Value = cdmStatus.Value;
                    data.Description = cdmStatus.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete CDMStatus
        /// </summary>
        /// <param name="cdmStatus">CDMStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMStatus/Delete")]
        public bool Delete([FromBody]CDMStatus cdmStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CDMStatus.FirstOrDefault(x => x.CDMStatusId == cdmStatus.CDMStatusId);
                if (data != null)
                {
                    context.CDMStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
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