select
	*
from
	ResearchDetails RD
left outer join
	AdaptationDetails AD
	on AD.ResearchDetailId = RD.ResearchDetailId
left outer join
	MitigationDetails MD
	on MD.ResearchDetailId = RD.ResearchDetailId
where
	AD.AdaptationDetailId is null
and
	MD.MitigationDetailId is null