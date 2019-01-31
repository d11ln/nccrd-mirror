if((select count(*) from ResearchMaturity) = 0)
begin
	insert into
		ResearchMaturity
		(
			[Value]
		)
	values
		('Published Research'),
		('Feasible Option'),
		('Pre-Design')
end