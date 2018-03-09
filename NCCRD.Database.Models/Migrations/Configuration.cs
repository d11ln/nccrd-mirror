namespace NCCRD.Database.Migrations
{
    using NCCRD.Database.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<NCCRD.Database.Models.Contexts.SQLDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "NCCRD.Database.Models.Contexts.SQLDBContext";
        }

        protected override void Seed(NCCRD.Database.Models.Contexts.SQLDBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.VersionHistory.AddOrUpdate(new VersionHistory()
            {
                VersionNumber = "v1.0.0",
                UpdateTime = DateTime.Parse("2009-01-31 10:23:21.740")
            });

            context.VersionHistory.AddOrUpdate(new VersionHistory()
            {
                VersionNumber = "v2.0.0",
                Comments = "Redesigned database structure (with EntityFramework 6.2.0 - CodeFirst)",
                UpdateTime = DateTime.Now
            });
        }
    }
}
