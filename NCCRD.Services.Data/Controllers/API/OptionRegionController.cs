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
    /// Manage OptionRegion data
    /// </summary>
    public class OptionRegionController : ApiController
    {
        /// <summary>
        /// Get all OptionRegion data
        /// </summary>
        /// <returns>OptionRegion data as JSON</returns>
        [HttpGet]
        [Route("api/OptionRegion/GetAll")]
        public IEnumerable<OptionRegion> GetAll()
        {
            List<OptionRegion> data = new List<OptionRegion>();

            using (var context = new SQLDBContext())
            {
                data = context.OptionRegion.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get OptionRegion by Id
        /// </summary>
        /// <param name="id">The Id of the OptionRegion to get</param>
        /// <returns>OptionRegion data as JSON</returns>
        [HttpGet]
        [Route("api/OptionRegion/GetByID/{id}")]
        public OptionRegion GetByID(int id)
        {
            OptionRegion data = null;

            using (var context = new SQLDBContext())
            {
                data = context.OptionRegion.FirstOrDefault(x => x.OptionRegionId == id);
            }

            return data;
        }

        /// <summary>
        /// Add OptionRegion
        /// </summary>
        /// <param name="optionRegion">The OptionRegion to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/OptionRegion/Add")]
        public bool Add([FromBody]OptionRegion optionRegion)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.OptionRegion.Count(x => x.OptionRegionId == optionRegion.OptionRegionId) == 0)
                {
                    //Add Driver entry
                    context.OptionRegion.Add(optionRegion);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update OptionRegion
        /// </summary>
        /// <param name="optionRegion">OptionRegion to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/OptionRegion/Update")]
        public bool Update([FromBody]OptionRegion optionRegion)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.OptionRegion.FirstOrDefault(x => x.OptionRegionId == optionRegion.OptionRegionId);
                if (data != null)
                {
                    data.RegionId = optionRegion.RegionId;
                    data.MAOptionId = optionRegion.MAOptionId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete OptionRegion
        /// </summary>
        /// <param name="optionRegion">OptionRegion to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/OptionRegion/Delete")]
        public bool Delete([FromBody]OptionRegion optionRegion)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.OptionRegion.FirstOrDefault(x => x.OptionRegionId == optionRegion.OptionRegionId);
                if (data != null)
                {
                    context.OptionRegion.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete OptionRegion by Id
        /// </summary>
        /// <param name="id">Id of OptionRegion to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/OptionRegion/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.OptionRegion.FirstOrDefault(x => x.OptionRegionId == id);
                if (data != null)
                {
                    context.OptionRegion.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}