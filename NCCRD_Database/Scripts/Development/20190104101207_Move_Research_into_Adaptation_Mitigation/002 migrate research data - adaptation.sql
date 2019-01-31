DECLARE @PID TABLE
(
  pid int
)

insert into @PID(pid)
values (415),(597),(855),(543),(85 ),(520),(53 ),(442),(574),(485),(576),(310),(51 ),(394),
(487),(498),(398),(602),(548),(474),(389),(515),(515),(521),(521),(181),(567),(48 ),(566),
(519),(40 ),(452),(221),(391),(494),(393),(437),(137),(577),(459),(536),(531),(309),(400),
(58 ),(50 ),(594),(522),(47 ),(493),(493),(528),(264),(453),(550),(54 ),(38 ),(571),(113),
(118),(229),(177),(302),(504),(504),(504),(178),(506),(449),(372),(843),(843),(505),(457),
(477),(533),(373),(558),(532),(390),(390),(45 ),(106),(57 ),(427),(247),(42 ),(578),(223),
(351),(49 ),(93 ),(23 ),(739),(739),(739),(739),(739),(739),(739),(739),(739),(443),(406),
(564),(44 ),(438),(436),(367),(560),(43 ),(545),(475),(527),(368),(429),(463),(108),(108),
(108),(108),(108),(108),(108),(108),(470)

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
			AdaptationDetails
			(
				AdaptationPurposeId,
				ProjectId,
				ProjectStatusId,
				ResearchDetailId
			)
		select
			(select top(1) AdaptationPurposeId from AdaptationPurpose where [Value] = 'Research') as [AdaptationPurposeId],
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


