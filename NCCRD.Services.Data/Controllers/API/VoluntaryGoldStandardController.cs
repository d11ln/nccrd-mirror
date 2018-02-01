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
    /// Manage VoluntaryGoldStandard data
    /// </summary>
    public class VoluntaryGoldStandardController : ApiController
    {
        /// <summary>
        /// Get all VoluntaryGoldStandard data
        /// </summary>
        /// <returns>VoluntaryGoldStandard data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryGoldStandard/GetAll")]
        public IEnumerable<VoluntaryGoldStandard> GetAll()
        {
            List<VoluntaryGoldStandard> data = new List<VoluntaryGoldStandard>();

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryGoldStandard.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get VoluntaryGoldStandard by Id
        /// </summary>
        /// <param name="id">The Id of the VoluntaryGoldStandard to get</param>
        /// <returns>VoluntaryGoldStandard data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryGoldStandard/GetByID/{id}")]
        public VoluntaryGoldStandard GetByID(int id)
        {
            VoluntaryGoldStandard data = null;

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == id);
            }

            return data;
        }

        /// <summary>
        /// Get VoluntaryGoldStandard by Value
        /// </summary>
        /// <param name="value">The Value of the VoluntaryGoldStandard to get</param>
        /// <returns>VoluntaryGoldStandard data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryGoldStandard/GetByValue/{value}")]
        public VoluntaryGoldStandard GetByValue(string value)
        {
            VoluntaryGoldStandard data = null;

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add VoluntaryGoldStandard
        /// </summary>
        /// <param name="voluntaryGoldStandard">The VoluntaryGoldStandard to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryGoldStandard/Add")]
        public bool Add([FromBody]VoluntaryGoldStandard voluntaryGoldStandard)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.VoluntaryGoldStandard.Count(x => x.VoluntaryGoldStandardId == voluntaryGoldStandard.VoluntaryGoldStandardId) == 0)
                {
                    //Add ValidationStatus entry
                    context.VoluntaryGoldStandard.Add(voluntaryGoldStandard);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update VoluntaryGoldStandard
        /// </summary>
        /// <param name="voluntaryGoldStandard">VoluntaryGoldStandard to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryGoldStandard/Update")]
        public bool Update([FromBody]VoluntaryGoldStandard voluntaryGoldStandard)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == voluntaryGoldStandard.VoluntaryGoldStandardId);
                if (data != null)
                {
                    //add properties to update here
                    data.Value = voluntaryGoldStandard.Value;
                    data.Description = voluntaryGoldStandard.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete VoluntaryGoldStandard
        /// </summary>
        /// <param name="voluntaryGoldStandard">VoluntaryGoldStandard to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryGoldStandard/Delete")]
        public bool Delete([FromBody]VoluntaryGoldStandard voluntaryGoldStandard)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == voluntaryGoldStandard.VoluntaryGoldStandardId);
                if (data != null)
                {
                    context.VoluntaryGoldStandard.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete VoluntaryGoldStandard by Id
        /// </summary>
        /// <param name="id">Id of VoluntaryGoldStandard to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/VoluntaryGoldStandard/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == id);
                if (data != null)
                {
                    context.VoluntaryGoldStandard.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}