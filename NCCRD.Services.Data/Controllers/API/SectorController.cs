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
    /// Manage Sector data
    /// </summary>
    public class SectorController : ApiController
    {
        /// <summary>
        /// Get all Sector data
        /// </summary>
        /// <returns>Sector data as JSON</returns>
        [HttpGet]
        [Route("api/Sector/GetAll")]
        public IEnumerable<Sector> GetAll()
        {
            List<Sector> data = new List<Sector>();

            using (var context = new SQLDBContext())
            {
                data = context.Sector.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Sector by Id
        /// </summary>
        /// <param name="id">The Id of the Sector to get</param>
        /// <returns>Sector data as JSON</returns>
        [HttpGet]
        [Route("api/Sector/GetByID/{id}")]
        public Sector GetByID(int id)
        {
            Sector data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Sector.FirstOrDefault(x => x.SectorId == id);
            }

            return data;
        }

        /// <summary>
        /// Get Sector by Value
        /// </summary>
        /// <param name="value">The Value of the Sector to get</param>
        /// <returns>Sector data as JSON</returns>
        [HttpGet]
        [Route("api/Sector/GetByValue/{value}")]
        public Sector GetByValue(string value)
        {
            Sector data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Sector.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add Sector
        /// </summary>
        /// <param name="sector">The Sector to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Sector/Add")]
        public bool Add([FromBody]Sector sector)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Sector.Count(x => x.SectorId == sector.SectorId) == 0)
                {
                    //Add Region entry
                    context.Sector.Add(sector);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update Sector
        /// </summary>
        /// <param name="sector">Sector to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Sector/Update")]
        public bool Update([FromBody]Sector sector)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Sector.FirstOrDefault(x => x.SectorId == sector.SectorId);
                if (data != null)
                {
                    data.Value = sector.Value;
                    data.SectorTypeId = sector.SectorTypeId;
                    data.ParentSectorID = sector.ParentSectorID;
                    data.TypologyId = sector.TypologyId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Sector
        /// </summary>
        /// <param name="sector">Sector to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Sector/Delete")]
        public bool Delete([FromBody]Sector sector)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Sector.FirstOrDefault(x => x.SectorId == sector.SectorId);
                if (data != null)
                {
                    context.Sector.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Sector by Id
        /// </summary>
        /// <param name="id">Id of Sector to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Sector/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Sector.FirstOrDefault(x => x.SectorId == id);
                if (data != null)
                {
                    context.Sector.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}