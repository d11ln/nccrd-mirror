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
    /// Manage Title data
    /// </summary>
    public class TitleController : ApiController
    {
        /// <summary>
        /// Get all Title data
        /// </summary>
        /// <returns>Title data as JSON</returns>
        [HttpGet]
        [Route("api/Title/GetAll")]
        public IEnumerable<Title> GetAll()
        {
            List<Title> data = new List<Title>();

            using (var context = new SQLDBContext())
            {
                data = context.Title.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Title by Id
        /// </summary>
        /// <param name="id">The Id of the Title to get</param>
        /// <returns>Title data as JSON</returns>
        [HttpGet]
        [Route("api/Title/GetByID/{id}")]
        public Title GetByID(int id)
        {
            Title data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Title.FirstOrDefault(x => x.TitleId == id);
            }

            return data;
        }

        /// <summary>
        /// Get Title by Value
        /// </summary>
        /// <param name="value">The Value of the Title to get</param>
        /// <returns>Title data as JSON</returns>
        [HttpGet]
        [Route("api/Title/GetByValue/{value}")]
        public Title GetByValue(string value)
        {
            Title data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Title.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add Title
        /// </summary>
        /// <param name="title">The Title to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Title/Add")]
        public bool Add([FromBody]Title title)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Title.Count(x => x.TitleId == title.TitleId) == 0)
                {
                    //Add Title entry
                    context.Title.Add(title);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Title
        /// </summary>
        /// <param name="title">Title to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Title/Update")]
        public bool Update([FromBody]Title title)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Title.FirstOrDefault(x => x.TitleId == title.TitleId);
                if (data != null)
                {
                    //add properties to update here
                    data.Value = title.Value;
                    data.Description = title.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Title
        /// </summary>
        /// <param name="title">Title to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Title/Delete")]
        public bool Delete([FromBody]Title title)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Title.FirstOrDefault(x => x.TitleId == title.TitleId);
                if (data != null)
                {
                    context.Title.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Title by Id
        /// </summary>
        /// <param name="id">Id of Title to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Title/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Title.FirstOrDefault(x => x.TitleId == id);
                if (data != null)
                {
                    context.Title.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}