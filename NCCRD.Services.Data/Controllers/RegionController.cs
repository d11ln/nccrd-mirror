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
    /// Manage Region data
    /// </summary>
    public class RegionController : ApiController
    {
        /// <summary>
        /// Get all Region data
        /// </summary>
        /// <returns>Region data as JSON</returns>
        [HttpGet]
        [Route("api/Region/GetAll")]
        public IEnumerable<Region> GetAll()
        {
            List<Region> data = new List<Region>();

            using (var context = new SQLDBContext())
            {
                data = context.Region.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Region by Id
        /// </summary>
        /// <param name="id">The Id of the Region to get</param>
        /// <returns>Region data as JSON</returns>
        [HttpGet]
        [Route("api/Region/GetByID/{id}")]
        public Region GetByID(int id)
        {
            Region data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Region.FirstOrDefault(x => x.RegionId == id);
            }

            return data;
        }

        /// <summary>
        /// Add Region
        /// </summary>
        /// <param name="region">The Region to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Region/Add")]
        public bool Add([FromBody]Region region)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Region.Count(x => x.RegionId == region.RegionId) == 0)
                {
                    //Add Region entry
                    context.Region.Add(region);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Region
        /// </summary>
        /// <param name="region">Region to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Region/Update")]
        public bool Update([FromBody]Region region)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Region.FirstOrDefault(x => x.RegionId == region.RegionId);
                if (data != null)
                {
                    data.RegionName = region.RegionName;
                    data.RegionDesription = region.RegionDesription;
                    data.LocationTypeId = region.LocationTypeId;
                    data.ParentRegionID = region.ParentRegionID;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Region
        /// </summary>
        /// <param name="region">Region to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Region/Delete")]
        public bool Delete([FromBody]Region region)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Region.FirstOrDefault(x => x.RegionId == region.RegionId);
                if (data != null)
                {
                    context.Region.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Region by Id
        /// </summary>
        /// <param name="id">Id of Region to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Region/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Region.FirstOrDefault(x => x.RegionId == id);
                if (data != null)
                {
                    context.Region.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}