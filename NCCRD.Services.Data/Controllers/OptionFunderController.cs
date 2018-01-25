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
    /// Manage OptionFunder data
    /// </summary>
    public class OptionFunderController : ApiController
    {
        /// <summary>
        /// Get all OptionFunder data
        /// </summary>
        /// <returns>OptionFunder data as JSON</returns>
        [HttpGet]
        [Route("api/OptionFunder/GetAll")]
        public IEnumerable<OptionFunder> GetAll()
        {
            List<OptionFunder> data = new List<OptionFunder>();

            using (var context = new SQLDBContext())
            {
                data = context.OptionFunder.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get OptionFunder by Id
        /// </summary>
        /// <param name="id">The Id of the OptionFunder to get</param>
        /// <returns>OptionFunder data as JSON</returns>
        [HttpGet]
        [Route("api/OptionFunder/GetByID/{id}")]
        public OptionFunder GetByID(int id)
        {
            OptionFunder data = null;

            using (var context = new SQLDBContext())
            {
                data = context.OptionFunder.FirstOrDefault(x => x.OptionFunderId == id);
            }

            return data;
        }

        /// <summary>
        /// Add OptionFunder
        /// </summary>
        /// <param name="optionFunder">The OptionFunder to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/OptionFunder/Add")]
        public bool Add([FromBody]OptionFunder optionFunder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.OptionFunder.Count(x => x.OptionFunderId == optionFunder.OptionFunderId) == 0)
                {
                    //Add Driver entry
                    context.OptionFunder.Add(optionFunder);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update OptionFunder
        /// </summary>
        /// <param name="optionFunder">OptionFunder to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/OptionFunder/Update")]
        public bool Update([FromBody]OptionFunder optionFunder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.OptionFunder.FirstOrDefault(x => x.OptionFunderId == optionFunder.OptionFunderId);
                if (data != null)
                {
                    data.FunderId = optionFunder.FunderId;
                    data.MAOptionId = optionFunder.MAOptionId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete OptionFunder
        /// </summary>
        /// <param name="optionFunder">OptionFunder to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/OptionFunder/Delete")]
        public bool Delete([FromBody]OptionFunder optionFunder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.OptionFunder.FirstOrDefault(x => x.OptionFunderId == optionFunder.OptionFunderId);
                if (data != null)
                {
                    context.OptionFunder.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete OptionFunder by Id
        /// </summary>
        /// <param name="id">Id of OptionFunder to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/OptionFunder/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.OptionFunder.FirstOrDefault(x => x.OptionFunderId == id);
                if (data != null)
                {
                    context.OptionFunder.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}