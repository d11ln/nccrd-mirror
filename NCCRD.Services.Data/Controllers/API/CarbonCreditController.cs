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
    /// Manage CarbonCredit data
    /// </summary>
    public class CarbonCreditController : ApiController
    {
        /// <summary>
        /// Get all CarbonCredit data
        /// </summary>
        /// <returns>CarbonCredit data as JSON</returns>
        [HttpGet]
        [Route("api/CarbonCredit/GetAll")]
        public IEnumerable<CarbonCredit> GetAll()
        {
            List<CarbonCredit> data = new List<CarbonCredit>();

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCredit
                    .OrderBy(x => x.Value.Trim())
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update CarbonCredit
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCredit/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<CarbonCredit> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.CarbonCredit.FirstOrDefault(x => x.CarbonCreditId == item.CarbonCreditId);
                    if (data != null)
                    {
                        //Update AdaptationPurpose entry
                        data.Value = item.Value;
                        data.Description = item.Description;
                    }
                    else
                    {
                        //Add AdaptationPurpose entry
                        context.CarbonCredit.Add(item);
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete CarbonCredit by Id
        /// </summary>
        /// <param name="id">Id of CarbonCredit to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/CarbonCredit/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CarbonCredit.FirstOrDefault(x => x.CarbonCreditId == id);
                if (data != null)
                {
                    context.CarbonCredit.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}