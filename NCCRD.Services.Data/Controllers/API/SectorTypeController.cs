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

        /// <summary>
        /// Add SectorType
        /// </summary>
        /// <param name="sectorType">The SectorType to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/SectorType/Add")]
        public bool Add([FromBody]SectorType sectorType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.SectorType.Count(x => x.SectorTypeId == sectorType.SectorTypeId) == 0)
                {
                    //Add Region entry
                    context.SectorType.Add(sectorType);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update SectorType
        /// </summary>
        /// <param name="sectorType">SectorType to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/SectorType/Update")]
        public bool Update([FromBody]SectorType sectorType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.SectorType.FirstOrDefault(x => x.SectorTypeId == sectorType.SectorTypeId);
                if (data != null)
                {
                    data.Name = sectorType.Name;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete SectorType
        /// </summary>
        /// <param name="sectorType">SectorType to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/SectorType/Delete")]
        public bool Delete([FromBody]SectorType sectorType)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.SectorType.FirstOrDefault(x => x.SectorTypeId == sectorType.SectorTypeId);
                if (data != null)
                {
                    context.SectorType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete SectorType by Id
        /// </summary>
        /// <param name="id">Id of SectorType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/SectorType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.SectorType.FirstOrDefault(x => x.SectorTypeId == id);
                if (data != null)
                {
                    context.SectorType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}