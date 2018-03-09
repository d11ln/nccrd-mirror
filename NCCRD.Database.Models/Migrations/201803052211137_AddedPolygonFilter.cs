namespace NCCRD.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.Text;

    public partial class AddedPolygonFilter : DbMigration
    {
        public override void Up()
        {
            StringBuilder storedProcedureCode = new StringBuilder();

            storedProcedureCode.Append("CREATE PROCEDURE dbo.PolygonFilter" + Environment.NewLine);
            storedProcedureCode.Append("@WKT VARCHAR(500)" + Environment.NewLine);
            storedProcedureCode.Append("AS" + Environment.NewLine);
            storedProcedureCode.Append("BEGIN" + Environment.NewLine);
            storedProcedureCode.Append("DECLARE @QUERY VARCHAR(1000) = " + Environment.NewLine);
            storedProcedureCode.Append("'SELECT Project.ProjectId, Project.ProjectTitle, Location.LocationId, Location.LatCalculated, Location.LonCalculated" + Environment.NewLine);
            storedProcedureCode.Append("FROM  Location" + Environment.NewLine);
            storedProcedureCode.Append("INNER JOIN ProjectLocation ON Location.LocationId = ProjectLocation.LocationId" + Environment.NewLine);
            storedProcedureCode.Append("INNER JOIN Project ON ProjectLocation.ProjectId = Project.ProjectId" + Environment.NewLine);
            storedProcedureCode.Append("WHERE geometry::STGeomFromText(''~WKT~'', 0).MakeValid().STIntersects(geometry::STGeomFromText(''POINT('' + CAST(Location.LonCalculated as VARCHAR(MAX)) + '' '' + CAST(Location.LatCalculated as VARCHAR(MAX)) + '')'', 0)) = 1';" + Environment.NewLine);
            storedProcedureCode.Append("SET @QUERY = REPLACE(@QUERY, '~WKT~', @WKT)" + Environment.NewLine);
            storedProcedureCode.Append("EXEC(@QUERY);" + Environment.NewLine);
            storedProcedureCode.Append("END" + Environment.NewLine);

            this.Sql(storedProcedureCode.ToString());
        }

        public override void Down()
        {
            this.Sql("DROP PROCEDURE dbo.PolygonFilter");
        }
    }
}
