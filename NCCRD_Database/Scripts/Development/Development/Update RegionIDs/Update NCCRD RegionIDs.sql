--select
--	*
	
update
	PR
set
	PR.RegionId = RM.NewRegionId
from
	NCCRD_TEST.dbo.ProjectRegion PR
inner join
	NCCRD_ImportData.dbo.RegionMapping RM
	ON PR.RegionId = RM.OldRegionId