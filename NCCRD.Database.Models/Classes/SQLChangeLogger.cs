using NCCRD.Database.Contexts;
using NCCRD.Database.Models;
using NCCRD.Services.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCCRD.Services.Data.Classes
{
    public class SQLChangeLogger : IChangeLogger
    {
        public bool Log(params ChangeLog[] logs)
        {
            bool result = false;

            using (var context = new SQLChangeLoggerContext())
            {
                if (logs.Length > 0)
                {
                    context.ChangeLog.AddRange(logs);
                    context.SaveChanges();
                }
                result = true;
            }

            return result;
        }

        public List<ChangeLog> GetLogs(DateTime from, DateTime to)
        {
            List<ChangeLog> result = new List<ChangeLog>();

            using (var context = new SQLChangeLoggerContext())
            {
                result = context.ChangeLog.Where(x => x.DateChanged >= from && x.DateChanged <= to).ToList();
            }

            return result;
        }
    }
}