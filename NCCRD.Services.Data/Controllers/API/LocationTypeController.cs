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
    /// Manage LocationType data
    /// </summary>
    public class LocationTypeController : ApiController
    {
        /// <summary>
        /// Get all LocationType data
        /// </summary>
        /// <returns>LocationType data as JSON</returns>
        [HttpGet]
        [Route("api/LocationType/GetAll")]
        public IEnumerable<LocationType> GetAll()
        {
            List<LocationType> data = new List<LocationType>();

            using (var context = new SQLDBContext())
            {
                data = context.LocationType.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get LocationType by Id
        /// </summary>
        /// <param name="id">The Id of the LocationType to get</param>
        /// <returns>LocationType data as JSON</returns>
        [HttpGet]
        [Route("api/LocationType/GetByID/{id}")]
        public LocationType GetByID(int id)
        {
            LocationType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.LocationType.FirstOrDefault(x => x.LocationTypeId == id);
            }

            return data;
        }

        /// <summary>
        /// Get LocationType by Value
        /// </summary>
        /// <param name="value">The Value of the LocationType to get</param>
        /// <returns>LocationType data as JSON</returns>
        [HttpGet]
        [Route("api/LocationType/GetByValue/{value}")]
        public LocationType GetByValue(string value)
        {
            LocationType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.LocationType.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /*/// <summary>
        /// Add LocationType
        /// </summary>
        /// <param name="locationType">The LocationType to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/LocationType/Add")]
        public bool Add([FromBody]LocationType locationType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.LocationType.Count(x => x.LocationTypeId == locationType.LocationTypeId) == 0)
                {
                    //Add LocationType entry
                    context.LocationType.Add(locationType);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update LocationType
        /// </summary>
        /// <param name="locationType">LocationType to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/LocationType/Update")]
        public bool Update([FromBody]LocationType locationType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.LocationType.FirstOrDefault(x => x.LocationTypeId == locationType.LocationTypeId);
                if (data != null)
                {
                    data.Value = locationType.Value;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete LocationType
        /// </summary>
        /// <param name="locationType">LocationType to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/LocationType/Delete")]
        public bool Delete([FromBody]LocationType locationType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.LocationType.FirstOrDefault(x => x.LocationTypeId == locationType.LocationTypeId);
                if (data != null)
                {
                    context.LocationType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete LocationType by Id
        /// </summary>
        /// <param name="id">Id of LocationType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/LocationType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.LocationType.FirstOrDefault(x => x.LocationTypeId == id);
                if (data != null)
                {
                    context.LocationType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}