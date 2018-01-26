using NCCRD.Database.Classes;
using NCCRD.Services.Data.Classes;
using NCCRD.Services.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;

namespace NCCRD.Database.Models.Contexts
{
    public class SQLDBContext : DbContext
    {
        public DbSet<AccessRight> AccessRights { get; set; }
        public DbSet<AdaptationDetail> AdaptationDetails { get; set; }
        public DbSet<AdaptationPurpose> AdaptationPurpose { get; set; }
        public DbSet<AppLog> AppLog { get; set; }
        public DbSet<CarbonCredit> CarbonCredit { get; set; }
        public DbSet<CarbonCreditMarket> CarbonCreditMarket { get; set; }
        public DbSet<CDMMethodology> CDMMethodology { get; set; }
        public DbSet<CDMStatus> CDMStatus { get; set; }
        private DbSet<ChangeLog> ChangeLog { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Feasibility> Feasibility { get; set; }
        public DbSet<Funder> Funders { get; set; }
        public DbSet<FundingStatus> FundingStatus { get; set; }
        public DbSet<Hazard> Hazards { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<LocationType> LocationType { get; set; }
        public DbSet<MAOption> MAOptions { get; set; }
        public DbSet<MitigationDetail> MitigationDetails { get; set; }
        public DbSet<MitigationEmissionsData> MitigationEmissionsData { get; set; }
        public DbSet<OptionFunder> OptionFunder { get; set; }
        public DbSet<OptionRegion> OptionRegion { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectFunder> ProjectFunder { get; set; }
        public DbSet<ProjectLocation> ProjectLocation { get; set; }
        public DbSet<ProjectRegion> ProjectRegion { get; set; }
        public DbSet<ProjectStatus> ProjectStatus { get; set; }
        public DbSet<ProjectSubType> ProjectSubType { get; set; }
        public DbSet<ProjectType> ProjectType { get; set; }
        public DbSet<ProjectTypology> ProjectTypology { get; set; }
        public DbSet<Region> Region { get; set; }
        public DbSet<ResearchDetail> ResearchDetails { get; set; }
        public DbSet<ResearchType> ResearchType { get; set; }
        public DbSet<Sector> Sector { get; set; }
        public DbSet<SectorType> SectorType { get; set; }
        public DbSet<SitePage> SitePages { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<TargetAudience> TargetAudience { get; set; }
        public DbSet<Title> Title { get; set; }
        public DbSet<Typology> Typology { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<ValidationStatus> ValidationStatus { get; set; }
        public DbSet<VersionHistory> VersionHistory { get; set; }
        public DbSet<VoluntaryGoldStandard> VoluntaryGoldStandard { get; set; }
        public DbSet<VoluntaryMethodology> VoluntaryMethodology { get; set; }

        public SQLDBContext() : base(Properties.Settings.Default.DefaultConnectionString)
        {
            System.Data.Entity.Database.SetInitializer(new SQLDBContextInitializer());
        }

        public SQLDBContext(string connectionString) : base(connectionString)
        {
            System.Data.Entity.Database.SetInitializer(new SQLDBContextInitializer());
        }

        public int SaveChanges(int? activeUserId)
        {
            List<ChangeLog> changes = new List<ChangeLog>();

            var modifiedEntities = ChangeTracker.Entries()
                .Where(p => p.State == EntityState.Modified || p.State == EntityState.Added || p.State == EntityState.Deleted).
                ToList();

            var now = DateTime.UtcNow;

            foreach (var change in modifiedEntities)
            {
                string entityName = change.Entity.GetType().Name;
                string primaryKeyValue = GetPrimaryKeyValue(change);

                IEnumerable<string> propNames;
                if(change.State == EntityState.Added)
                {
                    propNames = change.CurrentValues.PropertyNames;
                }
                else
                {
                    propNames = change.OriginalValues.PropertyNames;
                }

                foreach (var prop in propNames)
                {
                    string originalValue = "";
                    string currentValue = "";

                    //Get original value if possible
                    if (change.State != EntityState.Added && change.OriginalValues[prop] != null)
                    {
                        originalValue = change.OriginalValues[prop].ToString();
                    }

                    //Get current value if possible
                    if (change.State != EntityState.Deleted && change.CurrentValues[prop] != null)
                    {
                        currentValue = change.CurrentValues[prop].ToString();
                    }

                    //Compare
                    if (originalValue != currentValue)
                    {
                        ChangeLog log = new ChangeLog()
                        {
                            EntityName = entityName,
                            ChangeType = change.State.ToString(),
                            PrimaryKeyValue = primaryKeyValue,
                            PropertyName = prop,
                            OldValue = originalValue,
                            NewValue = currentValue,
                            DateChanged = now,
                            ActiveUserId = activeUserId
                        };

                        changes.Add(log);
                    }
                }
            }
            int saveResult = base.SaveChanges();

            //Log captured changes
            IChangeLogger logger = ChangeLoggerFactory.CreateLogger();
            logger.Log(changes.ToArray());

            return saveResult;
        }

        public override int SaveChanges()
        {
            return SaveChanges(null);
        }

        private string GetPrimaryKeyValue(DbEntityEntry entry)
        {
            if(entry.State == EntityState.Added)
            {
                return "";
            }
            else
            {
                var objectStateEntry = ((IObjectContextAdapter)this).ObjectContext.ObjectStateManager.GetObjectStateEntry(entry.Entity);
                return objectStateEntry.EntityKey.EntityKeyValues[0].Value.ToString();
            }
        }

    }

    public class SQLDBContextInitializer : CreateDatabaseIfNotExists<SQLDBContext>
    {
        protected override void Seed(SQLDBContext context)
        {
            SeedVersionHistoryData(context);

            base.Seed(context);
        }

        private void SeedVersionHistoryData(SQLDBContext context)
        {
            context.VersionHistory.AddRange(new List<VersionHistory>()
            {
                new VersionHistory()
                {
                    VersionNumber = "v1.0.0",
                    UpdateTime = DateTime.Parse("2009-01-31 10:23:21.740")
                },
                new VersionHistory()
                {
                    VersionNumber = "v2.0.0",
                    Comments = "Redesigned database structure (with EntityFramework 6.2.0 - CodeFirst)",
                    UpdateTime = DateTime.Now
                }
            });
        }

    }
}
