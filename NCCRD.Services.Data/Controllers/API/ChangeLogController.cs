using NCCRD.Database.Classes;
using NCCRD.Database.Contexts;
using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage ChangeLog data
    /// </summary>
    public class ChangeLogController : ApiController
    {
        IChangeLogger logger;

        public ChangeLogController()
        {
            logger = ChangeLoggerFactory.CreateLogger();
        }

        /// <summary>
        /// Get ChangeLogs with date range
        /// </summary>
        /// <param name="fromDate">From date. Format: yyyymmdd</param>
        /// <param name="toDate">To date. Format: yyyymmdd</param>
        /// <returns>ChangeLog data as JSON</returns>
        [HttpGet]
        [Route("api/ChangeLog/GetByDateRange/{fromDate}/{toDate}")]
        public IEnumerable<ChangeLog> GetByDateRange(int fromDate, int toDate)
        {
            List<ChangeLog> data = new List<ChangeLog>();
            DateTime from = DateTime.ParseExact(fromDate.ToString(), "yyyyMMdd", CultureInfo.InvariantCulture);
            DateTime to = DateTime.ParseExact(toDate.ToString(), "yyyyMMdd", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);

            data = logger.GetLogs(from, to);

            return data;
        }

        /// <summary>
        /// Add ChangeLog entry
        /// </summary>
        /// <param name="changeLog">The ChangeLog entry to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ChangeLog/Add")]
        [Authorize]
        public bool Add([FromBody]ChangeLog changeLog)
        {
            return logger.Log(changeLog);
        }
    }
}