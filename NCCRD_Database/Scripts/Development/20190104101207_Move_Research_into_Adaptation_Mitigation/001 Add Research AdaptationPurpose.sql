if((select count(*) from AdaptationPurpose where [Value] = 'Research') = 0)
begin
INSERT INTO
	[dbo].[AdaptationPurpose]
    (
		[Value],
		[Description]
	)
    VALUES
	(
		'Research',
		'Research Project'
	)
end


