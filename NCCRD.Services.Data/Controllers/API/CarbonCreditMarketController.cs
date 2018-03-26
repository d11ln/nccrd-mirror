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
    /// Manage CarbonCreditMarket data
    /// </summary>
    public class CarbonCreditMarketController : ApiController
    {
        /// <summary>
        /// Get all CarbonCreditMarket data
        /// </summary>
        /// <returns>CarbonCreditMarket data as JSON</returns>
        [HttpGet]
        [Route("api/CarbonCreditMarket/GetAll")]
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCreditMarket
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.CarbonCreditMarketId,
                        value = x.Value
                    })
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update CarbonCreditMarket
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCreditMarket/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<LookupDataViewModel> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.CarbonCreditMarket.FirstOrDefault(x => x.CarbonCreditMarketId == item.id);
                    if (data != null)
                    {
                        //Update CarbonCreditMarket entry
                        data.Value = item.value;
                        //data.Description = item.description;
                    }
                    else
                    {
                        //Add CarbonCreditMarket entry
                        context.CarbonCreditMarket.Add(new CarbonCreditMarket()
                        {
                            CarbonCreditMarketId = 0,
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
        /// Delete CarbonCreditMarket by Id
        /// </summary>
        /// <param name="id">Id of CarbonCreditMarket to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/CarbonCreditMarket/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CarbonCreditMarket.FirstOrDefault(x => x.CarbonCreditMarketId == id);
                if (data != null)
                {
                    context.CarbonCreditMarket.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}