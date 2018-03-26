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
    /// Manage ValidationStatus data
    /// </summary>
    public class ValidationStatusController : ApiController
    {
        /// <summary>
        /// Get all ValidationStatus data
        /// </summary>
        /// <returns>ValidationStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ValidationStatus/GetAll")]
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.ValidationStatus
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.ValidationStatusId,
                        value = x.Value
                    })
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update ValidationStatus
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ValidationStatus/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<LookupDataViewModel> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == item.id);
                    if (data != null)
                    {
                        // Update ValidationStatus entry
                        data.Value = item.value;
                        //data.Description = item.description;
                    }
                    else
                    {
                        // Add ValidationStatus entry
                        context.ValidationStatus.Add(new ValidationStatus()
                        {
                            ValidationStatusId = 0,
                            Value = item.value,
                            Description = "" //item.description
                        });
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete ValidationStatus by Id
        /// </summary>
        /// <param name="id">Id of ValidationStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ValidationStatus/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == id);
                if (data != null)
                {
                    context.ValidationStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}