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
    /// Manage Typology data
    /// </summary>
    public class TypologyController : ApiController
    {
        /// <summary>
        /// Get all Typology data
        /// </summary>
        /// <returns>Typology data as JSON</returns>
        [HttpGet]
        [Route("api/Typology/GetAll")]
        public IEnumerable<Typology> GetAll()
        {
            List<Typology> data = new List<Typology>();

            using (var context = new SQLDBContext())
            {
                data.Add(new Typology()
                {
                    TypologyID = 0,
                    Value = "All"
                });

                data.AddRange(context.Typology.OrderBy(x => x.Value).ToList());
            }

            return data;
        }

        /// <summary>
        /// Get Typology by Id
        /// </summary>
        /// <param name="id">The Id of the Typology to get</param>
        /// <returns>Typology data as JSON</returns>
        [HttpGet]
        [Route("api/Typology/GetByID/{id}")]
        public Typology GetByID(int id)
        {
            Typology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Typology.FirstOrDefault(x => x.TypologyID == id);
            }

            return data;
        }

        /// <summary>
        /// Get Typology by Value
        /// </summary>
        /// <param name="value">The Value of the Typology to get</param>
        /// <returns>Typology data as JSON</returns>
        [HttpGet]
        [Route("api/Typology/GetByValue/{value}")]
        public Typology GetByValue(string value)
        {
            Typology data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Typology.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add Typology
        /// </summary>
        /// <param name="typology">The Typology to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Typology/Add")]
        public bool Add([FromBody]Typology typology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Typology.Count(x => x.TypologyID == typology.TypologyID) == 0)
                {
                    //Add Title entry
                    context.Typology.Add(typology);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Typology
        /// </summary>
        /// <param name="typology">Typology to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Typology/Update")]
        public bool Update([FromBody]Typology typology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Typology.FirstOrDefault(x => x.TypologyID == typology.TypologyID);
                if (data != null)
                {
                    //add properties to update here
                    data.Value = typology.Value;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Typology
        /// </summary>
        /// <param name="typology">Typology to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Typology/Delete")]
        public bool Delete([FromBody]Typology typology)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Typology.FirstOrDefault(x => x.TypologyID == typology.TypologyID);
                if (data != null)
                {
                    context.Typology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Typology by Id
        /// </summary>
        /// <param name="id">Id of Typology to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Typology/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Typology.FirstOrDefault(x => x.TypologyID == id);
                if (data != null)
                {
                    context.Typology.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}