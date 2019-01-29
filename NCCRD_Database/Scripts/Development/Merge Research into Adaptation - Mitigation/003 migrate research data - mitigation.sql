DECLARE @PID TABLE
(
  pid int
)

insert into @PID(pid)
values (369),(53),(22),(362),(846),(117),(25),(398),(192),(281),(348),(40),(221),(625),(384),
	(404),(403),(222),(176),(397),(383),(400),(201),(140),(188),(580),(353),(385),(380),(586),
	(128),(233),(416),(38),(113),(620),(265),(229),(401),(392),(387),(377),(302),(381),(350),
	(372),(157),(61),(386),(365),(311),(106),(352),(414),(167),(388),(399),(405),(119),(364),
	(151),(60),(56),(164),(94),(382),(376),(378),(270),(275)

------------------------------------------------------------------------------------------------------
-- PROCESS ADAPTATION
------------------------------------------------------------------------------------------------------

while((select count(*) from @PID) > 0)
begin
	declare @projectId int = (select top(1) pid from @PID)

	DECLARE @RID TABLE
	(
	  rid int
	)

	insert into @RID(rid)
	select distinct
		RD.ResearchDetailId
	from
		Project P
	inner join
		ResearchDetails RD
		on RD.ProjectId = P.ProjectId
	where
		P.ProjectId = @projectId

	--Process each research-project for this ProjectId--
	while((select count(*) from @RID) > 0)
	begin
		declare @researchDetailId int = (select top(1) rid from @RID)

		insert into
			MitigationDetails
			(
				CarbonCreditId,
				ProjectId,
				ProjectStatusId,
				ResearchDetailId
			)
		select
			(select top(1) CarbonCreditId from CarbonCredit where [Value] = 'no') as CarbonCreditId,
			@projectId as [ProjectId],
			(select top(1) ProjectStatusId from ProjectStatus where [Value] = 'Published') as [ProjectStatusId],
			@researchDetailId as [ResearchDetailId]
		from
			ResearchDetails RD
		where
			RD.ResearchDetailId = @researchDetailId

		--Remove RID from list--
		delete top(1) from @RID
	end

	--Remove PID from list--
	delete top(1) from @PID
end


