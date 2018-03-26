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
    /// Manage ProjectSubType data
    /// </summary>
    public class ProjectSubTypeController : ApiController
    {
        /// <summary>
        /// Get all ProjectSubType data
        /// </summary>
        /// <returns>ProjectSubType data as JSON</returns>
        [HttpGet]
        [Route("api/ProjectSubType/GetAll")]
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.ProjectSubType
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.ProjectSubTypeId,
                        value = x.Value
                    })
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update ProjectSubType
        /// </summary>
        /// <param name="projectSubType">ProjectSubType to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ProjectSubType/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]ProjectSubType projectSubType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == projectSubType.ProjectSubTypeId);
                if (data != null)
                {
                    //Update ProjectSubType entry
                    data.Value = projectSubType.Value;
                    data.Description = projectSubType.Description;
                    data.ProjectTypeId = projectSubType.ProjectTypeId;
                }
                else
                {
                    //Add ProjectSubType entry
                    context.ProjectSubType.Add(projectSubType);
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete ProjectSubType by Id
        /// </summary>
        /// <param name="id">Id of ProjectSubType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ProjectSubType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ProjectSubType.FirstOrDefault(x => x.ProjectSubTypeId == id);
                if (data != null)
                {
                    context.ProjectSubType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}