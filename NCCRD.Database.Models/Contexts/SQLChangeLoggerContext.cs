using NCCRD.Database.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Contexts
{
    public class SQLChangeLoggerContext : DbContext
    {
        public DbSet<ChangeLog> ChangeLog { get; set; }

        public SQLChangeLoggerContext() : base(Properties.Settings.Default.DefaultConnectionString)
        {
            System.Data.Entity.Database.SetInitializer(new CreateDatabaseIfNotExists<SQLChangeLoggerContext>());
        }

        public SQLChangeLoggerContext(string connectionString) : base(connectionString)
        {
            System.Data.Entity.Database.SetInitializer(new CreateDatabaseIfNotExists<SQLChangeLoggerContext>());
        }
    }
}
