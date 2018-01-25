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
    /// Manage Drivers data
    /// </summary>
    public class DriversController : ApiController
    {
        /// <summary>
        /// Get all Driver data
        /// </summary>
        /// <returns>Driver data as JSON</returns>
        [HttpGet]
        [Route("api/Drivers/GetAll")]
        public IEnumerable<Driver> GetAll()
        {
            List<Driver> data = new List<Driver>();

            using (var context = new SQLDBContext())
            {
                data = context.Drivers.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Driver by Id
        /// </summary>
        /// <param name="id">The Id of the Driver to get</param>
        /// <returns>Driver data as JSON</returns>
        [HttpGet]
        [Route("api/Drivers/GetByID/{id}")]
        public Driver GetByID(int id)
        {
            Driver data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Drivers.FirstOrDefault(x => x.DriverId == id);
            }

            return data;
        }

        /// <summary>
        /// Add Driver
        /// </summary>
        /// <param name="driver">The Driver to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Drivers/Add")]
        public bool Add([FromBody]Driver driver)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Drivers.Count(x => x.DriverId == driver.DriverId) == 0)
                {
                    //Add Driver entry
                    context.Drivers.Add(driver);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Driver
        /// </summary>
        /// <param name="driver">Driver to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Drivers/Update")]
        public bool Update([FromBody]Driver driver)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Drivers.FirstOrDefault(x => x.DriverId == driver.DriverId);
                if (data != null)
                {
                    //add properties to update here
                    //..
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Driver
        /// </summary>
        /// <param name="driver">Driver to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Drivers/Delete")]
        public bool Delete([FromBody]Driver driver)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Drivers.FirstOrDefault(x => x.DriverId == driver.DriverId);
                if (data != null)
                {
                    context.Drivers.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Driver by Id
        /// </summary>
        /// <param name="id">Id of Driver to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Drivers/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Drivers.FirstOrDefault(x => x.DriverId == id);
                if (data != null)
                {
                    context.Drivers.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}