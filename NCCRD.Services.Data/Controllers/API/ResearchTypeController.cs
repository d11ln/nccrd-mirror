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
    /// Manage ResearchType data
    /// </summary>
    public class ResearchTypeController : ApiController
    {
        /// <summary>
        /// Get all ResearchType data
        /// </summary>
        /// <returns>ResearchType data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchType/GetAll")]
        public IEnumerable<ResearchType> GetAll()
        {
            List<ResearchType> data = new List<ResearchType>();

            using (var context = new SQLDBContext())
            {
                data = context.ResearchType.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ResearchType by Id
        /// </summary>
        /// <param name="id">The Id of the ResearchType to get</param>
        /// <returns>ResearchType data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchType/GetByID/{id}")]
        public ResearchType GetByID(int id)
        {
            ResearchType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ResearchType by Value
        /// </summary>
        /// <param name="value">The Value of the ResearchType to get</param>
        /// <returns>ResearchType data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchType/GetByValue/{value}")]
        public ResearchType GetByValue(string value)
        {
            ResearchType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ResearchType.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add ResearchType
        /// </summary>
        /// <param name="researchType">The ResearchType to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchType/Add")]
        public bool Add([FromBody]ResearchType researchType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ResearchType.Count(x => x.ResearchTypeId == researchType.ResearchTypeId) == 0)
                {
                    //Add Region entry
                    context.ResearchType.Add(researchType);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ResearchType
        /// </summary>
        /// <param name="researchType">ResearchType to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchType/Update")]
        public bool Update([FromBody]ResearchType researchType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == researchType.ResearchTypeId);
                if (data != null)
                {
                    data.Value = researchType.Value;
                    data.Description = researchType.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ResearchType
        /// </summary>
        /// <param name="researchType">ResearchType to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchType/Delete")]
        public bool Delete([FromBody]ResearchType researchType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == researchType.ResearchTypeId);
                if (data != null)
                {
                    context.ResearchType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ResearchType by Id
        /// </summary>
        /// <param name="id">Id of ResearchType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ResearchType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == id);
                if (data != null)
                {
                    context.ResearchType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}