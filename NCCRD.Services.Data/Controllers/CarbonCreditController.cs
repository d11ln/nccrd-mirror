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
                data = context.CarbonCredit.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get CarbonCredit by Id
        /// </summary>
        /// <param name="id">The Id of the CarbonCredit to get</param>
        /// <returns>CarbonCredit data as JSON</returns>
        [HttpGet]
        [Route("api/CarbonCredit/GetByID/{id}")]
        public CarbonCredit GetByID(int id)
        {
            CarbonCredit data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCredit.FirstOrDefault(x => x.CarbonCreditId == id);
            }

            return data;
        }

        /// <summary>
        /// Get CarbonCredit by Value
        /// </summary>
        /// <param name="value">The Value of the CarbonCredit to get</param>
        /// <returns>CarbonCredit data as JSON</returns>
        [HttpGet]
        [Route("api/CarbonCredit/GetByValue/{value}")]
        public CarbonCredit GetByValue(string value)
        {
            CarbonCredit data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CarbonCredit.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add CarbonCredit
        /// </summary>
        /// <param name="carbonCredit">The CarbonCredit to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCredit/Add")]
        public bool Add([FromBody]CarbonCredit carbonCredit)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.CarbonCredit.Count(x => x.CarbonCreditId == carbonCredit.CarbonCreditId) == 0)
                {
                    //Add AdaptationPurpose entry
                    context.CarbonCredit.Add(carbonCredit);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update CarbonCredit
        /// </summary>
        /// <param name="carbonCredit">CarbonCredit to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCredit/Update")]
        public bool Update([FromBody]CarbonCredit carbonCredit)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CarbonCredit.FirstOrDefault(x => x.CarbonCreditId == carbonCredit.CarbonCreditId);
                if (data != null)
                {
                    data.Value = carbonCredit.Value;
                    data.Description = carbonCredit.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete CarbonCredit
        /// </summary>
        /// <param name="carbonCredit">CarbonCredit to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CarbonCredit/Delete")]
        public bool Delete([FromBody]CarbonCredit carbonCredit)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CarbonCredit.FirstOrDefault(x => x.CarbonCreditId == carbonCredit.CarbonCreditId);
                if (data != null)
                {
                    context.CarbonCredit.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
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