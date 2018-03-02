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
    /// Manage Location data
    /// </summary>
    public class LocationController : ApiController
    {
        /// <summary>
        /// Get all Location data
        /// </summary>
        /// <returns>Location data as JSON</returns>
        [HttpGet]
        [Route("api/Location/GetAll")]
        public IEnumerable<Location> GetAll()
        {
            List<Location> data = new List<Location>();

            using (var context = new SQLDBContext())
            {
                data = context.Location.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Location by Id
        /// </summary>
        /// <param name="id">The Id of the Location to get</param>
        /// <returns>Location data as JSON</returns>
        [HttpGet]
        [Route("api/Location/GetByID/{id}")]
        public Location GetByID(int id)
        {
            Location data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Location.FirstOrDefault(x => x.LocationId == id);
            }

            return data;
        }

        /*/// <summary>
        /// Add Location
        /// </summary>
        /// <param name="location">The Location to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Location/Add")]
        public bool Add([FromBody]Location location)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Location.Count(x => x.LocationId == location.LocationId) == 0)
                {
                    //Add Location entry
                    context.Location.Add(location);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update Location
        /// </summary>
        /// <param name="location">Location to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Location/Update")]
        public bool Update([FromBody]Location location)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Location.FirstOrDefault(x => x.LocationId == location.LocationId);
                if (data != null)
                {
                    data.LatDegree = location.LatDegree;
                    data.LatMinutes = location.LatMinutes;
                    data.LatSeconds = location.LatSeconds;
                    data.LatDirection = location.LatDirection;
                    data.LatCalculated = location.LatCalculated;
                    data.LonDegree = location.LonDegree;
                    data.LonMinutes = location.LonMinutes;
                    data.LonSeconds = location.LonSeconds;
                    data.LonDirection = location.LonDirection;
                    data.LonCalculated = location.LonCalculated;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Location
        /// </summary>
        /// <param name="location">Location to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Location/Delete")]
        public bool Delete([FromBody]Location location)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Location.FirstOrDefault(x => x.LocationId == location.LocationId);
                if (data != null)
                {
                    context.Location.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Location by Id
        /// </summary>
        /// <param name="id">Id of Location to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Location/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Location.FirstOrDefault(x => x.LocationId == id);
                if (data != null)
                {
                    context.Location.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}