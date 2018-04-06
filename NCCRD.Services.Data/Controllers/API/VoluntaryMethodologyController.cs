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
                data = context.VoluntaryMethodology
                    .OrderBy(x => x.Value.Trim())
                    .ToList();
            }

            return data;
        }


        /// <summary>
        /// Add/Update VoluntaryMethodology
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/VoluntaryMethodology/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<VoluntaryMethodology> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.VoluntaryMethodology.FirstOrDefault(x => x.VoluntaryMethodologyId == item.VoluntaryMethodologyId);
                    if (data != null)
                    {
                        //Update
                        data.Value = item.Value;
                        data.Description = item.Description;
                    }
                    else
                    {
                        //Add
                        context.VoluntaryMethodology.Add(item);
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
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
        }
    }
}