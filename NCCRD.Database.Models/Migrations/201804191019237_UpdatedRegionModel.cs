namespace NCCRD.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedRegionModel : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Region", new[] { "ParentRegionID" });
            CreateIndex("dbo.Region", "ParentRegionId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Region", new[] { "ParentRegionId" });
            CreateIndex("dbo.Region", "ParentRegionID");
        }
    }
}
