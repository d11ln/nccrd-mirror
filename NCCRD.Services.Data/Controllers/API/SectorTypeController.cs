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
    /// Manage SectorType data
    /// </summary>
    public class SectorTypeController : ApiController
    {
        /// <summary>
        /// Get all SectorType data
        /// </summary>
        /// <returns>SectorType data as JSON</returns>
        [HttpGet]
        [Route("api/SectorType/GetAll")]
        public IEnumerable<SectorType> GetAll()
        {
            List<SectorType> data = new List<SectorType>();

            using (var context = new SQLDBContext())
            {
                data = context.SectorType.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get SectorType by Id
        /// </summary>
        /// <param name="id">The Id of the SectorType to get</param>
        /// <returns>SectorType data as JSON</returns>
        [HttpGet]
        [Route("api/SectorType/GetByID/{id}")]
        public SectorType GetByID(int id)
        {
            SectorType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.SectorType.FirstOrDefault(x => x.SectorTypeId == id);
            }

            return data;
        }

        /// <summary>
        /// Get SectorType by Value
        /// </summary>
        /// <param name="name">The Value of the SectorType to get</param>
        /// <returns>SectorType data as JSON</returns>
        [HttpGet]
        [Route("api/SectorType/GetByValue/{value}")]
        public SectorType GetByValue(string name)
        {
            SectorType data = null;

            using (var context = new SQLDBContext())
            {
                data = context.SectorType.FirstOrDefault(x => x.Name == name);
            }

            return data;
        }
    }
}