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
    /// Access VersionHistory data 
    /// </summary>
    public class VersionHistoryController : ApiController
    {
        /// <summary>
        /// Get all VersionHistory data
        /// </summary>
        /// <returns>VersionHistory data as JSON</returns>
        [HttpGet]
        [Route("api/VersionHistory/GetAll")]
        public IEnumerable<VersionHistory> GetAll()
        {
            List<VersionHistory> data = new List<VersionHistory>();

            using (var context = new SQLDBContext())
            {
                data = context.VersionHistory.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get latest VersionHistory entry
        /// </summary>
        /// <returns>VersionHistory data as JSON</returns>
        [HttpGet]
        [Route("api/VersionHistory/GetLatest")]
        public VersionHistory GetLatest()
        {
            VersionHistory data = null;

            using (var context = new SQLDBContext())
            {
                data = context.VersionHistory.OrderByDescending(x => x.VersionHistoryId).First();
            }

            return data;
        }
    }
}