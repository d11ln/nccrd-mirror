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
    /// Manage ProjectType data
    /// </summary>
    public class ProjectTypeController : ApiController
    {
        /// <summary>
        /// Get all ProjectType data
        /// </summary>
        /// <returns>ProjectType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectType/GetAll")]
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectType
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.ProjectTypeId,
                        value = x.Value
                    })
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add or Update ProjectType
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectType/AddOrUpdate")]
        public bool AddOrUpdate([FromBody] List<LookupDataViewModel> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == item.id);
                    if (data != null)
                    {
                        //Update
                        data.Value = item.value;
                        //data.Description = item.description;
                    }
                    else
                    {
                        //Add
                        context.ProjectType.Add(new ProjectType()
                        {
                            ProjectTypeId = 0,
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
        /// Delete ProjectType by Id
        /// </summary>
        /// <param name="id">Id of ProjectType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectType.FirstOrDefault(x => x.ProjectTypeId == id);
                if (data != null)
                {
                    context.ProjectType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}