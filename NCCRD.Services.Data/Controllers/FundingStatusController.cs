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
    /// Manage FundingStatus data
    /// </summary>
    public class FundingStatusController : ApiController
    {
        /// <summary>
        /// Get all FundingStatus data
        /// </summary>
        /// <returns>FundingStatus data as JSON</returns>
        [HttpGet]
        [Route("api/FundingStatus/GetAll")]
        public IEnumerable<FundingStatus> GetAll()
        {
            List<FundingStatus> data = new List<FundingStatus>();

            using (var context = new SQLDBContext())
            {
                data = context.FundingStatus.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get FundingStatus by Id
        /// </summary>
        /// <param name="id">The Id of the FundingStatus to get</param>
        /// <returns>FundingStatus data as JSON</returns>
        [HttpGet]
        [Route("api/FundingStatus/GetByID/{id}")]
        public FundingStatus GetByID(int id)
        {
            FundingStatus data = null;

            using (var context = new SQLDBContext())
            {
                data = context.FundingStatus.FirstOrDefault(x => x.FundingStatusId == id);
            }

            return data;
        }

        /// <summary>
        /// Get FundingStatus by Value
        /// </summary>
        /// <param name="value">The Value of the FundingStatus to get</param>
        /// <returns>FundingStatus data as JSON</returns>
        [HttpGet]
        [Route("api/FundingStatus/GetByValue/{value}")]
        public FundingStatus GetByValue(string value)
        {
            FundingStatus data = null;

            using (var context = new SQLDBContext())
            {
                data = context.FundingStatus.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add FundingStatus
        /// </summary>
        /// <param name="fundingStatus">The FundingStatus to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/FundingStatus/Add")]
        public bool Add([FromBody]FundingStatus fundingStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.FundingStatus.Count(x => x.FundingStatusId == fundingStatus.FundingStatusId) == 0)
                {
                    //Add CDMStatus entry
                    context.FundingStatus.Add(fundingStatus);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update FundingStatus
        /// </summary>
        /// <param name="fundingStatus">FundingStatus to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/FundingStatus/Update")]
        public bool Update([FromBody]FundingStatus fundingStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.FundingStatus.FirstOrDefault(x => x.FundingStatusId == fundingStatus.FundingStatusId);
                if (data != null)
                {
                    data.Value = fundingStatus.Value;
                    data.Description = fundingStatus.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete FundingStatus
        /// </summary>
        /// <param name="fundingStatus">FundingStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/FundingStatus/Delete")]
        public bool Delete([FromBody]FundingStatus fundingStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.FundingStatus.FirstOrDefault(x => x.FundingStatusId == fundingStatus.FundingStatusId);
                if (data != null)
                {
                    context.FundingStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete FundingStatus by Id
        /// </summary>
        /// <param name="id">Id of FundingStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/FundingStatus/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.FundingStatus.FirstOrDefault(x => x.FundingStatusId == id);
                if (data != null)
                {
                    context.FundingStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}