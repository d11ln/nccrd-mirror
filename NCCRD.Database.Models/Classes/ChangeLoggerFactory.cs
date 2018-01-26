using NCCRD.Services.Data.Classes;
using NCCRD.Services.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Classes
{
    public class ChangeLoggerFactory
    {
        /// <summary>
        /// Create change logger
        /// </summary>
        /// <remarks>Logger type sonfigure in app.config</remarks>
        /// <returns>IChangeLogger instance</returns>
        public static IChangeLogger CreateLogger()
        {
            IChangeLogger logger = null;
            string type = Properties.Settings.Default.LoggerType;

            switch(type)
            {
                case "SQLDB":
                    logger = new SQLChangeLogger();
                    break;
            }

            return logger;
        }
    }
}
