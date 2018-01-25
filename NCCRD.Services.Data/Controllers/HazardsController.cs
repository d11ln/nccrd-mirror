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
    /// Manage Hazards data
    /// </summary>
    public class HazardsController : ApiController
    {
        /// <summary>
        /// Get all Hazard data
        /// </summary>
        /// <returns>Hazard data as JSON</returns>
        [HttpGet]
        [Route("api/Hazards/GetAll")]
        public IEnumerable<Hazard> GetAll()
        {
            List<Hazard> data = new List<Hazard>();

            using (var context = new SQLDBContext())
            {
                data = context.Hazards.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Hazard by Id
        /// </summary>
        /// <param name="id">The Id of the Hazard to get</param>
        /// <returns>Hazard data as JSON</returns>
        [HttpGet]
        [Route("api/Hazards/GetByID/{id}")]
        public Hazard GetByID(int id)
        {
            Hazard data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Hazards.FirstOrDefault(x => x.DriverId == id);
            }

            return data;
        }

        /// <summary>
        /// Add Hazard
        /// </summary>
        /// <param name="hazard">The Hazard to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Hazards/Add")]
        public bool Add([FromBody]Hazard hazard)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Hazards.Count(x => x.HazardId == hazard.HazardId) == 0)
                {
                    //Add Driver entry
                    context.Hazards.Add(hazard);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Hazard
        /// </summary>
        /// <param name="hazard">Hazard to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Hazards/Update")]
        public bool Update([FromBody]Hazard hazard)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Hazards.FirstOrDefault(x => x.HazardId == hazard.HazardId);
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
        /// Delete Hazard
        /// </summary>
        /// <param name="hazard">Hazard to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Hazards/Delete")]
        public bool Delete([FromBody]Hazard hazard)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Hazards.FirstOrDefault(x => x.HazardId == hazard.HazardId);
                if (data != null)
                {
                    context.Hazards.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Hazard by Id
        /// </summary>
        /// <param name="id">Id of Hazard to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Hazards/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Hazards.FirstOrDefault(x => x.HazardId == id);
                if (data != null)
                {
                    context.Hazards.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}