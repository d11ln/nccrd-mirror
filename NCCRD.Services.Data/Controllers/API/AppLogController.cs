using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
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
    /// Manage AppLog data
    /// </summary>
    public class AppLogController : ApiController
    {
        /// <summary>
        /// Get all AppLogs
        /// </summary>
        /// <returns>AppLog data as JSON</returns>
        [HttpGet]
        [Route("api/AppLog/GetAll")]
        public IEnumerable<AppLog> GetAll()
        {
            List<AppLog> data = new List<AppLog>();

            using (var context = new SQLDBContext())
            {
                data = context.AppLog.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get AppLogs UserId
        /// </summary>
        /// <param name="userId">UserId to search on</param>
        /// <returns>AppLog data as JSON</returns>
        [HttpGet]
        [Route("api/AppLog/GetByUserId/{userId}")]
        public IEnumerable<AppLog> GetByUserId(int userId)
        {
            List<AppLog> data = new List<AppLog>();

            using (var context = new SQLDBContext())
            {
                data = context.AppLog.Where(x => x.ActiveUserId == userId).ToList();
            }

            return data;
        }

        /// <summary>
        /// Get AppLogs with date range
        /// </summary>
        /// <param name="fromDate">From date. Format: yyyymmdd</param>
        /// <param name="toDate">To date. Format: yyyymmdd</param>
        /// <returns>AppLog data as JSON</returns>
        [HttpGet]
        [Route("api/AppLog/GetByDateRange/{fromDate}/{toDate}")]
        public IEnumerable<AppLog> GetByDateRange(int fromDate, int toDate)
        {
            List<AppLog> data = new List<AppLog>();
            DateTime from = DateTime.ParseExact(fromDate.ToString(), "yyyyMMdd", CultureInfo.InvariantCulture);
            DateTime to = DateTime.ParseExact(toDate.ToString(), "yyyyMMdd", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);

            using (var context = new SQLDBContext())
            {
                data = context.AppLog.Where(x => x.LogTime >= from && x.LogTime <= to).ToList();
            }

            return data;
        }

        /// <summary>
        /// Add AppLog entry
        /// </summary>
        /// <param name="appLog">The AppLog entry to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AppLog/Add")]
        [Authorize]
        public bool Add([FromBody]AppLog appLog)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Add AppLog entry
                context.AppLog.Add(appLog);
                context.SaveChanges();

                result = true;
            }

            return result;
        }
    }
}