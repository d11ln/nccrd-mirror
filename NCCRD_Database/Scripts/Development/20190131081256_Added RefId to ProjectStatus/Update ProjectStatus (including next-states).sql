select
	*
from
	ProjectStatus


declare @NewStates table
(
	OldStatus VARCHAR(150),
	NewStatus VARCHAR(150),
	RefId INT,
	NextStates VARCHAR(150)
)

insert into @NewStates
(
	OldStatus, NewStatus, RefId, NextStates
)
values
('Planned', 'Planned', 1, '2,6,7'),
('Adopted', 'Adopted (Approved)', 2, '3,6,7'),
('In progress', 'In Progress', 3, '4,6,7'),
('Implemented', 'Implemented (Operational)', 4, '5,6,7'),
('Expired', 'Expired', 5, '5'),
('Published', 'Published', 6, '6'),
('Discontinued', 'Discontinued', 7, '7')


--INSERT NEW STATES--
insert into
	ProjectStatus
	(
		[Value],
		NextStates,
		RefId
	)
select
	NS.NewStatus,
	NS.NextStates,
	NS.RefId
from
	@NewStates NS
left outer join
	ProjectStatus PS
	on PS.[Value] = NS.OldStatus
where
	PS.[Value] is null

--UPDATE EXISTING STATES--
update
	PS
set
	PS.[Value] = NS.NewStatus,
	PS.NextStates = NS.NextStates,
	PS.RefId = NS.RefId
from
	ProjectStatus PS
inner join
	@NewStates NS
	on PS.[Value] = NS.OldStatus


select
	*
from
	ProjectStatus