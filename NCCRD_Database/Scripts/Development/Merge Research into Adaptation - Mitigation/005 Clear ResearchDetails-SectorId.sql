select * from ResearchDetails
where SectorId is not null

update
	ResearchDetails
set
	SectorId = null
where
	SectorId is not null