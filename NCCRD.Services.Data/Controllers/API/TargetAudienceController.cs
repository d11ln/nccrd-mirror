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
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.TargetAudience
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.TargetAudienceId,
                        value = x.Value
                    }).ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update TargetAudience
        /// </summary>
        /// <param name="items">TargetAudience to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/TargetAudience/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<LookupDataViewModel> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == item.id);
                    if (data != null)
                    {
                        //Update TargetAudience entry
                        data.Value = item.value;
                        //data.Description = item.description;
                    }
                    else
                    {
                        //Add TargetAudience entry
                        context.TargetAudience.Add(new TargetAudience()
                        {
                            TargetAudienceId = 0,
                            Value = item.value,
                            Description = "" //item.description
                        });
                    }
                }

                context.SaveChanges();
                result = true;
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