namespace NCCRD.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _201804021300_UpdatedModels : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Sector", new[] { "ParentSectorID" });
            CreateIndex("dbo.Sector", "ParentSectorId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Sector", new[] { "ParentSectorId" });
            CreateIndex("dbo.Sector", "ParentSectorID");
        }
    }
}
