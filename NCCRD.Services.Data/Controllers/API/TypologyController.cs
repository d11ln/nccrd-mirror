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
                //data.Add(new Typology()
                //{
                //    TypologyID = 0,
                //    Value = "All"
                //});

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
                data = context.Typology.FirstOrDefault(x => x.TypologyId == id);
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
    }
}