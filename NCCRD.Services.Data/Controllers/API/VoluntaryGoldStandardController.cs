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
    /// Manage VoluntaryGoldStandard data
    /// </summary>
    public class VoluntaryGoldStandardController : ApiController
    {
        /// <summary>
        /// Get all VoluntaryGoldStandard data
        /// </summary>
        /// <returns>VoluntaryGoldStandard data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryGoldStandard/GetAll")]
        public IEnumerable<VoluntaryGoldStandard> GetAll()
        {
            List<VoluntaryGoldStandard> data = new List<VoluntaryGoldStandard>();

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryGoldStandard
                    .OrderBy(x => x.Value.Trim())
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update VoluntaryGoldStandard
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryGoldStandard/AddOrUpdate")]
        [Authorize]
        public bool AddOrUpdate([FromBody]List<VoluntaryGoldStandard> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == item.VoluntaryGoldStandardId);
                    if (data != null)
                    {
                        //Update entry
                        data.Value = item.Value;
                        data.Description = item.Description;
                    }
                    else
                    {
                        //Add entry
                        context.VoluntaryGoldStandard.Add(item);
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete VoluntaryGoldStandard by Id
        /// </summary>
        /// <param name="id">Id of VoluntaryGoldStandard to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/VoluntaryGoldStandard/DeleteById/{id}")]
        [Authorize]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == id);
                if (data != null)
                {
                    context.VoluntaryGoldStandard.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}