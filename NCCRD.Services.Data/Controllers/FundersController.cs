using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
{
    /// <summary>
    /// Manage Funder data
    /// </summary>
    public class FundersController : ApiController
    {
        /// <summary>
        /// Get all Funder data
        /// </summary>
        /// <returns>Funder data as JSON</returns>
        [HttpGet]
        [Route("api/Funders/GetAll")]
        public IEnumerable<Funder> GetAll()
        {
            List<Funder> data = new List<Funder>();

            using (var context = new SQLDBContext())
            {
                data = context.Funders.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Funder by Id
        /// </summary>
        /// <param name="id">The Id of the Funder to get</param>
        /// <returns>Funder data as JSON</returns>
        [HttpGet]
        [Route("api/Funders/GetByID/{id}")]
        public Funder GetByID(int id)
        {
            Funder data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Funders.FirstOrDefault(x => x.FunderId == id);
            }

            return data;
        }

        /// <summary>
        /// Get Funder by Value
        /// </summary>
        /// <param name="value">The Value of the Funder to get</param>
        /// <returns>Funder data as JSON</returns>
        [HttpGet]
        [Route("api/Funders/GetByValue/{value}")]
        public Funder GetByValue(string value)
        {
            Funder data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Funders.FirstOrDefault(x => x.Name == value);
            }

            return data;
        }

        /// <summary>
        /// Add Funder
        /// </summary>
        /// <param name="funder">The Funder to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Funders/Add")]
        public bool Add([FromBody]Funder funder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Funders.Count(x => x.FunderId == funder.FunderId) == 0)
                {
                    //Add CDMStatus entry
                    context.Funders.Add(funder);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Funder
        /// </summary>
        /// <param name="funder">Funder to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Funders/Update")]
        public bool Update([FromBody]Funder funder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Funders.FirstOrDefault(x => x.FunderId == funder.FunderId);
                if (data != null)
                {
                    data.Name = funder.Name;
                    data.Description = funder.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Funder
        /// </summary>
        /// <param name="funder">Funder to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Funders/Delete")]
        public bool Delete([FromBody]Funder funder)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Funders.FirstOrDefault(x => x.FunderId == funder.FunderId);
                if (data != null)
                {
                    context.Funders.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Funder by Id
        /// </summary>
        /// <param name="id">Id of Funder to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Funders/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Funders.FirstOrDefault(x => x.FunderId == id);
                if (data != null)
                {
                    context.Funders.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}