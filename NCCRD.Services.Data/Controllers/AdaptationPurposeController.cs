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
                data = context.AdaptationPurpose.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get AdaptationPurpose by Id
        /// </summary>
        /// <param name="id">The Id of the AdaptationPurpose to get</param>
        /// <returns>AdaptationPurpose data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationPurpose/GetByID/{id}")]
        public AdaptationPurpose GetByID(int id)
        {
            AdaptationPurpose data = null;

            using (var context = new SQLDBContext())
            {
                data = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == id);
            }

            return data;
        }

        /// <summary>
        /// Add AdaptationPurpose
        /// </summary>
        /// <param name="adaptationPurpose">The AdaptationPurpose to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationPurpose/Add")]
        public bool Add([FromBody]AdaptationPurpose adaptationPurpose)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.AdaptationPurpose.Count(x => x.AdaptationPurposeId == adaptationPurpose.AdaptationPurposeId) == 0)
                {
                    //Add AdaptationPurpose entry
                    context.AdaptationPurpose.Add(adaptationPurpose);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update AdaptationPurpose
        /// </summary>
        /// <param name="adaptationPurpose">AdaptationPurpose to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationPurpose/Update")]
        public bool Update([FromBody]AdaptationPurpose adaptationPurpose)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == adaptationPurpose.AdaptationPurposeId);
                if (data != null)
                {
                    data.Value = adaptationPurpose.Value;
                    data.Description = adaptationPurpose.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete AdaptationPurpose
        /// </summary>
        /// <param name="adaptationPurpose">AdaptationPurpose to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationPurpose/Delete")]
        public bool Delete([FromBody]AdaptationPurpose adaptationPurpose)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == adaptationPurpose.AdaptationPurposeId);
                if (data != null)
                {
                    context.AdaptationPurpose.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
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