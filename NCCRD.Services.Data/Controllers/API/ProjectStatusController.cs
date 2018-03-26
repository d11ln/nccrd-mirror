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
    /// Manage ProjectStatus data
    /// </summary>
    public class ProjectStatusController : ApiController
    {
        /// <summary>
        /// Get all ProjectStatus data
        /// </summary>
        /// <returns>ProjectStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectStatus/GetAll")]
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectStatus
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.ProjectStatusId,
                        value = x.Value
                    })
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update ProjectStatus
        /// </summary>
        /// <param name="items">ProjectStatus to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectStatus/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<LookupDataViewModel> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == item.id);
                    if (data != null)
                    {
                        //Update ProjectStatus entry
                        data.Value = item.value;
                        //data.Description = item.description;
                    }
                    else
                    {
                        //Add ProjectStatus entry
                        context.ProjectStatus.Add(new ProjectStatus()
                        {
                            ProjectStatusId = 0,
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
        /// Delete ProjectStatus by Id
        /// </summary>
        /// <param name="id">Id of ProjectStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectStatus/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectStatus.FirstOrDefault(x => x.ProjectStatusId == id);
                if (data != null)
                {
                    context.ProjectStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}