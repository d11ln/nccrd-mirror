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
    /// Manage TargetAudience data
    /// </summary>
    public class TargetAudienceController : ApiController
    {
        /// <summary>
        /// Get all TargetAudience data
        /// </summary>
        /// <returns>TargetAudience data as JSON</returns>
        [HttpGet]
        [Route("api/TargetAudience/GetAll")]
        public IEnumerable<TargetAudience> GetAll()
        {
            List<TargetAudience> data = new List<TargetAudience>();

            using (var context = new SQLDBContext())
            {
                data = context.TargetAudience.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get TargetAudience by Id
        /// </summary>
        /// <param name="id">The Id of the TargetAudience to get</param>
        /// <returns>TargetAudience data as JSON</returns>
        [HttpGet]
        [Route("api/TargetAudience/GetByID/{id}")]
        public TargetAudience GetByID(int id)
        {
            TargetAudience data = null;

            using (var context = new SQLDBContext())
            {
                data = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == id);
            }

            return data;
        }

        /// <summary>
        /// Get TargetAudience by Value
        /// </summary>
        /// <param name="value">The Value of the TargetAudience to get</param>
        /// <returns>TargetAudience data as JSON</returns>
        [HttpGet]
        [Route("api/TargetAudience/GetByValue/{value}")]
        public TargetAudience GetByValue(string value)
        {
            TargetAudience data = null;

            using (var context = new SQLDBContext())
            {
                data = context.TargetAudience.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add TargetAudience
        /// </summary>
        /// <param name="targetAudience">The TargetAudience to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/TargetAudience/Add")]
        public bool Add([FromBody]TargetAudience targetAudience)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.TargetAudience.Count(x => x.TargetAudienceId == targetAudience.TargetAudienceId) == 0)
                {
                    //Add TargetAudience entry
                    context.TargetAudience.Add(targetAudience);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update TargetAudience
        /// </summary>
        /// <param name="targetAudience">TargetAudience to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/TargetAudience/Update")]
        public bool Update([FromBody]TargetAudience targetAudience)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == targetAudience.TargetAudienceId);
                if (data != null)
                {
                    //add properties to update here
                    data.Value = targetAudience.Value;
                    data.Description = targetAudience.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete TargetAudience
        /// </summary>
        /// <param name="targetAudience">TargetAudience to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/TargetAudience/Delete")]
        public bool Delete([FromBody]TargetAudience targetAudience)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == targetAudience.TargetAudienceId);
                if (data != null)
                {
                    context.TargetAudience.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete TargetAudience by Id
        /// </summary>
        /// <param name="id">Id of TargetAudience to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/TargetAudience/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == id);
                if (data != null)
                {
                    context.TargetAudience.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}