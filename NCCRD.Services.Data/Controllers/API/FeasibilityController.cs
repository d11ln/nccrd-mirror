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
    /// Manage Feasibility data
    /// </summary>
    public class FeasibilityController : ApiController
    {
        /// <summary>
        /// Get all Feasibility data
        /// </summary>
        /// <returns>Feasibility data as JSON</returns>
        [HttpGet]
        [Route("api/Feasibility/GetAll")]
        public IEnumerable<Feasibility> GetAll()
        {
            List<Feasibility> data = new List<Feasibility>();

            using (var context = new SQLDBContext())
            {
                data = context.Feasibility.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Feasibility by Id
        /// </summary>
        /// <param name="id">The Id of the Feasibility to get</param>
        /// <returns>Feasibility data as JSON</returns>
        [HttpGet]
        [Route("api/Feasibility/GetByID/{id}")]
        public Feasibility GetByID(int id)
        {
            Feasibility data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Feasibility.FirstOrDefault(x => x.FeasibilityId == id);
            }

            return data;
        }

        /*/// <summary>
        /// Add Feasibility
        /// </summary>
        /// <param name="feasibility">The Feasibility to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Feasibility/Add")]
        public bool Add([FromBody]Feasibility feasibility)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Feasibility.Count(x => x.FeasibilityId == feasibility.FeasibilityId) == 0)
                {
                    //Add ValidationStatus entry
                    context.Feasibility.Add(feasibility);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update Feasibility
        /// </summary>
        /// <param name="feasibility">Feasibility to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Feasibility/Update")]
        public bool Update([FromBody]Feasibility feasibility)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Feasibility.FirstOrDefault(x => x.FeasibilityId == feasibility.FeasibilityId);
                if (data != null)
                {
                    //add properties to update here
                    //..
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Feasibility
        /// </summary>
        /// <param name="feasibility">Feasibility to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Feasibility/Delete")]
        public bool Delete([FromBody]Feasibility feasibility)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Feasibility.FirstOrDefault(x => x.FeasibilityId == feasibility.FeasibilityId);
                if (data != null)
                {
                    context.Feasibility.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Feasibility by Id
        /// </summary>
        /// <param name="id">Id of Feasibility to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Feasibility/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Feasibility.FirstOrDefault(x => x.FeasibilityId == id);
                if (data != null)
                {
                    context.Feasibility.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}