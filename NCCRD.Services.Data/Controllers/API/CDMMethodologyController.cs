using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
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
                data = context.CDMMethodology
                    .OrderBy(x => x.Value.Trim())
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update CDMMethodology
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/CDMMethodology/AddOrUpdate")]
        [Authorize]
        public bool AddOrUpdate([FromBody]List<CDMMethodology> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.CDMMethodology.FirstOrDefault(x => x.CDMMethodologyId == item.CDMMethodologyId);
                    if (data != null)
                    {
                        //Update CDMMethodology entry
                        data.Value = item.Value;
                        data.Description = item.Description;
                    }
                    else
                    {
                        //Add CDMMethodology entry
                        context.CDMMethodology.Add(item);
                    }
                }

                context.SaveChanges();
                result = true;
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
        [Authorize]
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