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
    /// Manage VoluntaryMethodology data
    /// </summary>
    public class VoluntaryMethodologyController : ApiController
    {
        /// <summary>
        /// Get all VoluntaryMethodology data
        /// </summary>
        /// <returns>VoluntaryMethodology data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryMethodology/GetAll")]
        public IEnumerable<VoluntaryMethodology> GetAll()
        {
            List<VoluntaryMethodology> data = new List<VoluntaryMethodology>();

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryMethodology.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get VoluntaryGoldStandard by Id
        /// </summary>
        /// <param name="id">The Id of the VoluntaryMethodology to get</param>
        /// <returns>VoluntaryMethodology data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryMethodology/GetByID/{id}")]
        public VoluntaryMethodology GetByID(int id)
        {
            VoluntaryMethodology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryMethodology.FirstOrDefault(x => x.VoluntaryMethodologyId == id);
            }

            return data;
        }

        /// <summary>
        /// Get VoluntaryMethodology by Value
        /// </summary>
        /// <param name="value">The Value of the VoluntaryMethodology to get</param>
        /// <returns>VoluntaryMethodology data as JSON</returns>
        [HttpGet]
        [Route("api/VoluntaryMethodology/GetByValue/{value}")]
        public VoluntaryMethodology GetByValue(string value)
        {
            VoluntaryMethodology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.VoluntaryMethodology.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /*/// <summary>
        /// Add VoluntaryMethodology
        /// </summary>
        /// <param name="voluntaryMethodology">The VoluntaryMethodology to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryMethodology/Add")]
        public bool Add([FromBody]VoluntaryMethodology voluntaryMethodology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.VoluntaryMethodology.Count(x => x.VoluntaryMethodologyId == voluntaryMethodology.VoluntaryMethodologyId) == 0)
                {
                    //Add ValidationStatus entry
                    context.VoluntaryMethodology.Add(voluntaryMethodology);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update VoluntaryMethodology
        /// </summary>
        /// <param name="voluntaryMethodology">VoluntaryMethodology to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryMethodology/Update")]
        public bool Update([FromBody]VoluntaryMethodology voluntaryMethodology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryMethodology.FirstOrDefault(x => x.VoluntaryMethodologyId == voluntaryMethodology.VoluntaryMethodologyId);
                if (data != null)
                {
                    //add properties to update here
                    data.Value = voluntaryMethodology.Value;
                    data.Description = voluntaryMethodology.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete VoluntaryMethodology
        /// </summary>
        /// <param name="voluntaryMethodology">VoluntaryMethodology to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryMethodology/Delete")]
        public bool Delete([FromBody]VoluntaryMethodology voluntaryMethodology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryMethodology.FirstOrDefault(x => x.VoluntaryMethodologyId == voluntaryMethodology.VoluntaryMethodologyId);
                if (data != null)
                {
                    context.VoluntaryMethodology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete VoluntaryMethodology by Id
        /// </summary>
        /// <param name="id">Id of VoluntaryMethodology to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/VoluntaryMethodology/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.VoluntaryMethodology.FirstOrDefault(x => x.VoluntaryMethodologyId == id);
                if (data != null)
                {
                    context.VoluntaryMethodology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}