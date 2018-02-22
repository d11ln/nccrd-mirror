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
    /// Manage MAOptions data
    /// </summary>
    public class MAOptionsController : ApiController
    {
        /// <summary>
        /// Get all MAOptions data
        /// </summary>
        /// <returns>MAOptions data as JSON</returns>
        [HttpGet]
        [Route("api/MAOptions/GetAll")]
        public IEnumerable<MAOption> GetAll()
        {
            List<MAOption> data = new List<MAOption>();

            using (var context = new SQLDBContext())
            {
                data = context.MAOptions.OrderBy(x => x.Name.Trim()).ToList();
            }

            return data;
        }

        /// <summary>
        /// Get MAOption by Id
        /// </summary>
        /// <param name="id">The Id of the MAOption to get</param>
        /// <returns>MAOption data as JSON</returns>
        [HttpGet]
        [Route("api/Hazards/GetByID/{id}")]
        public MAOption GetByID(int id)
        {
            MAOption data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MAOptions.FirstOrDefault(x => x.MAOptionId == id);
            }

            return data;
        }

        /// <summary>
        /// Get MAOption by FeasibilityId
        /// </summary>
        /// <param name="feasibilityId">The FeasibilityId of the MAOption to get</param>
        /// <returns>MAOption data as JSON</returns>
        [HttpGet]
        [Route("api/MAOptions/GetByFeasibilityId/{feasibilityId}")]
        public MAOption GetByFeasibilityId(int feasibilityId)
        {
            MAOption data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MAOptions.FirstOrDefault(x => x.FeasibilityId == feasibilityId);
            }

            return data;
        }

        /// <summary>
        /// Get MAOption by HazardId
        /// </summary>
        /// <param name="hazardId">The HazardId of the MAOption to get</param>
        /// <returns>MAOption data as JSON</returns>
        [HttpGet]
        [Route("api/MAOptions/GetByHazardId/{hazardId}")]
        public MAOption GetByHazardId(int hazardId)
        {
            MAOption data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MAOptions.FirstOrDefault(x => x.HazardId == hazardId);
            }

            return data;
        }

        /// <summary>
        /// Get MAOption by SectorId
        /// </summary>
        /// <param name="sectorId">The SectorId of the MAOption to get</param>
        /// <returns>MAOption data as JSON</returns>
        [HttpGet]
        [Route("api/MAOptions/GetBySectorId/{sectorId}")]
        public MAOption GetBySectorId(int sectorId)
        {
            MAOption data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MAOptions.FirstOrDefault(x => x.SectorId == sectorId);
            }

            return data;
        }

        /// <summary>
        /// Add MAOption
        /// </summary>
        /// <param name="maOption">The MAOption to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MAOptions/Add")]
        public bool Add([FromBody]MAOption maOption)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.MAOptions.Count(x => x.MAOptionId == maOption.MAOptionId) == 0)
                {
                    //Add Driver entry
                    context.MAOptions.Add(maOption);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update MAOption
        /// </summary>
        /// <param name="maOption">MAOption to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MAOptions/Update")]
        public bool Update([FromBody]MAOption maOption)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MAOptions.FirstOrDefault(x => x.MAOptionId == maOption.MAOptionId);
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
        /// Delete MAOption
        /// </summary>
        /// <param name="maOption">MAOption to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MAOptions/Delete")]
        public bool Delete([FromBody]MAOption maOption)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MAOptions.FirstOrDefault(x => x.MAOptionId == maOption.MAOptionId);
                if (data != null)
                {
                    context.MAOptions.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete MAOption by Id
        /// </summary>
        /// <param name="id">Id of MAOption to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/MAOptions/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MAOptions.FirstOrDefault(x => x.MAOptionId == id);
                if (data != null)
                {
                    context.MAOptions.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}