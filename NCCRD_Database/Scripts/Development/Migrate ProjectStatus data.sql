USE NCCRD_TEST
GO

IF EXISTS (SELECT *
           FROM   sys.objects
           WHERE  object_id = OBJECT_ID(N'[dbo].[fn_npclean_string]')
                  AND type IN ( N'FN', N'IF', N'TF', N'FS', N'FT' ))
  DROP FUNCTION [dbo].[fn_npclean_string]

GO 
USE NCCRD_TEST
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_npclean_string] 
(
	@strIn AS VARCHAR(1000)
)
RETURNS VARCHAR(1000)
AS
BEGIN
	DECLARE @iPtr AS INT
	SET @iPtr = PATINDEX('%[^ -~0-9A-Z]%', @strIn COLLATE LATIN1_GENERAL_BIN)

	WHILE @iPtr > 0 
	BEGIN
		SET @strIn = REPLACE(@strIn COLLATE LATIN1_GENERAL_BIN, SUBSTRING(@strIn, @iPtr, 1), '#')
		SET @iPtr = PATINDEX('%[^ -~0-9A-Z]%', @strIn COLLATE LATIN1_GENERAL_BIN)
	END

	RETURN @strIn
END
GO

update
	P
set
	P.ProjectStatusId = case
		when PLV.ItemDisplay = 'Operational' then (SELECT top(1) PS.ProjectStatusId from [NCCRD_TEST].[dbo].[ProjectStatus] PS where PS.Value = 'In progress')
		when PLV.ItemDisplay = 'Under Development' then (SELECT top(1) PS.ProjectStatusId from [NCCRD_TEST].[dbo].[ProjectStatus] PS where PS.Value = 'Planned')
		when PLV.ItemDisplay = 'Complete' then (SELECT top(1) PS.ProjectStatusId from [NCCRD_TEST].[dbo].[ProjectStatus] PS where PS.Value = 'Published')
	end
--select
--	PD.ProjectDetailsId,
--	PD.ProjectTitle,
--	PD.Status,
--	PLV.ItemDisplay,
--	P.ProjectId,
--	P.ProjectTitle,
--	case
--		when PLV.ItemDisplay = 'Operational' then (SELECT top(1) PS.Value from [NCCRD_TEST].[dbo].[ProjectStatus] PS where PS.Value = 'In progress')
--		when PLV.ItemDisplay = 'Under Development' then (SELECT top(1) PS.Value from [NCCRD_TEST].[dbo].[ProjectStatus] PS where PS.Value = 'Planned')
--		when PLV.ItemDisplay = 'Complete' then (SELECT top(1) PS.Value from [NCCRD_TEST].[dbo].[ProjectStatus] PS where PS.Value = 'Published')
--	end as [NewStatus]
from
	[NCCRD].[dbo].[tb_erm_project_details] PD
inner join
	[NCCRD].[dbo].[tb_erm_picklist_value] PLV
	on PLV.ItemNum = PD.Status
	and PLV.ListId = 10004
inner join
	[NCCRD_TEST].[dbo].[Project] P
	ON [NCCRD_TEST].[dbo].[fn_npclean_string](LTRIM(RTRIM(P.ProjectTitle))) = [NCCRD_TEST].[dbo].[fn_npclean_string](LTRIM(RTRIM(PD.ProjectTitle))) collate database_default
where
	PD.Status is not null