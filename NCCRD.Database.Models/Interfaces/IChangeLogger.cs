using NCCRD.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.Data.Interfaces
{
    public interface IChangeLogger
    {
        bool Log(params ChangeLog[] logs);

        List<ChangeLog> GetLogs(DateTime from, DateTime to);
    }
}
