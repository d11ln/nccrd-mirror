using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
{
    public class ProjectsController : ApiController
    {
        /// <summary>
        /// Gat all projects
        /// </summary>
        /// <returns></returns>
        public string Get()
        {
            string result = "not found";

            using (var context = new SQLDBContext())
            {
                var projectList = context.Project.ToList();

                if(projectList != null && projectList.Count > 0)
                {
                    result = JsonConvert.SerializeObject(projectList);
                }
            }

            return result;
        }

        /// <summary>
        /// Get project by Id
        /// </summary>
        /// <param name="id">The Id of the Project to Get</param>
        /// <returns></returns>
        public string Get(string id)
        {
            string result = "not found";

            using (var context = new SQLDBContext())
            {
                var project = context.Project.FirstOrDefault(x => x.ProjectTitle == id);

                if(project != null)
                {
                    result = JsonConvert.SerializeObject(project);
                }
            }

            return result;
        }

        //// GET api/<controller>
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}