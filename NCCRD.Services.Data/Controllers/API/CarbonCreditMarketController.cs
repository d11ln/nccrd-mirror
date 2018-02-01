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
        public IEnumerable<CarbonCreditMarket> GetAll()
        {
            List<CarbonCreditMarket> data = new List<CarbonCreditMarket>();

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCreditMarket.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get CarbonCreditMarket by Id
        /// </summary>
        /// <param name="id">The Id of the CarbonCreditMarket to get</param>
        /// <returns>CarbonCreditMarket data as JSON</returns>
        [HttpGet]
        [Route("api/CarbonCreditMarket/GetByID/{id}")]
        public CarbonCreditMarket GetByID(int id)
        {
            CarbonCreditMarket data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCreditMarket.FirstOrDefault(x => x.CarbonCreditMarketId == id);
            }

            return data;
        }

        /// <summary>
        /// Get CarbonCreditMarket by Value
        /// </summary>
        /// <param name="value">The Value of the CarbonCreditMarket to get</param>
        /// <returns>CarbonCreditMarket data as JSON</returns>
        [HttpGet]
        [Route("api/CarbonCreditMarket/GetByValue/{value}")]
        public CarbonCreditMarket GetByValue(string value)
        {
            CarbonCreditMarket data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCreditMarket.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add CarbonCreditMarket
        /// </summary>
        /// <param name="carbonCreditMarket">The CarbonCreditMarket to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCreditMarket/Add")]
        public bool Add([FromBody]CarbonCreditMarket carbonCreditMarket)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.CarbonCreditMarket.Count(x => x.CarbonCreditMarketId == carbonCreditMarket.CarbonCreditMarketId) == 0)
                {
                    //Add CarbonCreditMarket entry
                    context.CarbonCreditMarket.Add(carbonCreditMarket);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update CarbonCreditMarket
        /// </summary>
        /// <param name="carbonCreditMarket">CarbonCreditMarket to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCreditMarket/Update")]
        public bool Update([FromBody]CarbonCreditMarket carbonCreditMarket)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CarbonCreditMarket.FirstOrDefault(x => x.CarbonCreditMarketId == carbonCreditMarket.CarbonCreditMarketId);
                if (data != null)
                {
                    data.Value = carbonCreditMarket.Value;
                    data.Description = carbonCreditMarket.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete CarbonCreditMarket
        /// </summary>
        /// <param name="carbonCreditMarket">CarbonCreditMarket to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCreditMarket/Delete")]
        public bool Delete([FromBody]CarbonCreditMarket carbonCreditMarket)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CarbonCreditMarket.FirstOrDefault(x => x.CarbonCreditMarketId == carbonCreditMarket.CarbonCreditMarketId);
                if (data != null)
                {
                    context.CarbonCreditMarket.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
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