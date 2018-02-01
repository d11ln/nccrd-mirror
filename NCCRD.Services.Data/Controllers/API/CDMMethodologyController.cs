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
    /// Manage CDMMethodology data
    /// </summary>
    public class CDMMethodologyController : ApiController
    {
        /// <summary>
        /// Get all CDMMethodology data
        /// </summary>
        /// <returns>CDMMethodology data as JSON</returns>
        [HttpGet]
        [Route("api/CDMMethodology/GetAll")]
        public IEnumerable<CDMMethodology> GetAll()
        {
            List<CDMMethodology> data = new List<CDMMethodology>();

            using (var context = new SQLDBContext())
            {
                data = context.CDMMethodology.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get CDMMethodology by Id
        /// </summary>
        /// <param name="id">The Id of the CDMMethodology to get</param>
        /// <returns>CDMMethodology data as JSON</returns>
        [HttpGet]
        [Route("api/CDMMethodology/GetByID/{id}")]
        public CDMMethodology GetByID(int id)
        {
            CDMMethodology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CDMMethodology.FirstOrDefault(x => x.CDMMethodologyId == id);
            }

            return data;
        }

        /// <summary>
        /// Get CDMMethodology by Value
        /// </summary>
        /// <param name="value">The Value of the CDMMethodology to get</param>
        /// <returns>CDMMethodology data as JSON</returns>
        [HttpGet]
        [Route("api/CDMMethodology/GetByValue/{value}")]
        public CDMMethodology GetByValue(string value)
        {
            CDMMethodology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.CDMMethodology.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add CDMMethodology
        /// </summary>
        /// <param name="cdmMethodology">The CDMMethodology to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMMethodology/Add")]
        public bool Add([FromBody]CDMMethodology cdmMethodology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.CDMMethodology.Count(x => x.CDMMethodologyId == cdmMethodology.CDMMethodologyId) == 0)
                {
                    //Add CDMMethodology entry
                    context.CDMMethodology.Add(cdmMethodology);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update CDMMethodology
        /// </summary>
        /// <param name="cdmMethodology">CDMMethodology to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMMethodology/Update")]
        public bool Update([FromBody]CDMMethodology cdmMethodology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CDMMethodology.FirstOrDefault(x => x.CDMMethodologyId == cdmMethodology.CDMMethodologyId);
                if (data != null)
                {
                    data.Value = cdmMethodology.Value;
                    data.Description = cdmMethodology.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete CDMMethodology
        /// </summary>
        /// <param name="cdmMethodology">CDMMethodology to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMMethodology/Delete")]
        public bool Delete([FromBody]CDMMethodology cdmMethodology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CDMMethodology.FirstOrDefault(x => x.CDMMethodologyId == cdmMethodology.CDMMethodologyId);
                if (data != null)
                {
                    context.CDMMethodology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete CDMMethodology by Id
        /// </summary>
        /// <param name="id">Id of CDMMethodology to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/CDMMethodology/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.CDMMethodology.FirstOrDefault(x => x.CDMMethodologyId == id);
                if (data != null)
                {
                    context.CDMMethodology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}