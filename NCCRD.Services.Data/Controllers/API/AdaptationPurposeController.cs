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
    /// Manage AdaptationPurpose data
    /// </summary>
    public class AdaptationPurposeController : ApiController
    {
        /// <summary>
        /// Get all AdaptationPurpose
        /// </summary>
        /// <returns>AdaptationPurpose data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationPurpose/GetAll")]
        public IEnumerable<AdaptationPurpose> GetAll()
        {
            List<AdaptationPurpose> data = new List<AdaptationPurpose>();

            using (var context = new SQLDBContext())
            {
                data = context.AdaptationPurpose
                    .OrderBy(x => x.Value.Trim())
                    .ToList();

            }

            return data;
        }

        /// <summary>
        /// Add/Update AdaptationPurpose
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationPurpose/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<AdaptationPurpose> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == item.AdaptationPurposeId);
                    if (data != null)
                    {
                        //Update AdaptationPurpose entry
                        data.Value = item.Value;
                        data.Description = item.Description;
                    }
                    else
                    {
                        //Add AdaptationPurpose entry
                        context.AdaptationPurpose.Add(item);
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete AdaptationPurpose by Id
        /// </summary>
        /// <param name="id">Id of AdaptationPurpose to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/AdaptationPurpose/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == id);
                if (data != null)
                {
                    context.AdaptationPurpose.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}