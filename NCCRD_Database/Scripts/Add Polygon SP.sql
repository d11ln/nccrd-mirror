USE [NCCRD_TEST]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[PolygonFilter]
@WKT VARCHAR(MAX)
AS
BEGIN
DECLARE @QUERY VARCHAR(MAX) = 
'SELECT Project.*
FROM  Location
INNER JOIN ProjectLocation ON Location.LocationId = ProjectLocation.LocationId
INNER JOIN Project ON ProjectLocation.ProjectId = Project.ProjectId
WHERE geometry::STGeomFromText(''~WKT~'', 0).MakeValid().STIntersects(geometry::STGeomFromText(''POINT('' + CAST(Location.LonCalculated as VARCHAR(MAX)) + '' '' + CAST(Location.LatCalculated as VARCHAR(MAX)) + '')'', 0)) = 1';
SET @QUERY = REPLACE(@QUERY, '~WKT~', @WKT)
EXEC(@QUERY);
END

GO


/*
USE [NCCRD_TEST]
GO

DROP PROCEDURE [dbo].[PolygonFilter]
GO
*/

