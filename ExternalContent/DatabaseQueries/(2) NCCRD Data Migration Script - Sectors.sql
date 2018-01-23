-- ## (2) NCCRD Data Migration Script - Sectors ## --
USE Master

--SectorTypes--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.SectorType) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.SectorType
		(
			[Name]
		)
	VALUES
		('HostSector'),
		('MainSubSector'),
		('SubSector')

	--ADAPTATION--

	--HostSector--
	INSERT INTO
		[NCCRDv2].dbo.Sector
		(
			[Value],
			SectorType_SectorTypeId,
			Typology_TypologyID
		)
	SELECT
		PLV.ItemDisplay,
		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'HostSector'),
		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Adaptation')
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Adaptation Host Sector'

	--MITIGATION--

	--HostSector--
	INSERT INTO
		[NCCRDv2].dbo.Sector
		(
			[Value],
			SectorType_SectorTypeId,
			Typology_TypologyID
		)
	SELECT
		PLV.ItemDisplay,
		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'HostSector'),
		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation')
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Host Sector'

	--MainSubSector--
	INSERT INTO
		[NCCRDv2].dbo.Sector
		(
			[Value],
			SectorType_SectorTypeId,
			Typology_TypologyID,
			ParentSector_SectorId
		)
	SELECT
		MSS.MainSubSectorType,
		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'MainSubSector'),
		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
		PS.SectorId
	FROM
		[NCCRD].[dbo].[tb_erm_Mitigation_MainSubSector] MSS
	INNER JOIN
		(
			SELECT
				PLV.*
			FROM
				[NCCRD].dbo.tb_erm_picklist PL
			INNER JOIN
				[NCCRD].dbo.tb_erm_picklist_value PLV
				ON PL.ListId = PLV.ListId
			WHERE
				PL.ListName = 'Host Sector'
		) HS
		ON HS.ItemNum = MSS.HostSectorId
	INNER JOIN
		(
			SELECT
				S.*
			FROM
				[NCCRDv2].dbo.Sector S
			INNER JOIN
				[NCCRDv2].dbo.SectorType ST
				ON S.SectorType_SectorTypeId = ST.SectorTypeId
			INNER JOIN
				[NCCRDv2].dbo.Typology T
				ON T.TypologyID = S.Typology_TypologyID
			WHERE
				ST.Name = 'HostSector'	
				AND
				T.Value = 'Mitigation'		
		) PS
		ON PS.Value = HS.ItemDisplay

	--INSERT INTO
	--	[NCCRDv2].dbo.Sector
	--	(
	--		[Value],
	--		SectorType_SectorTypeId,
	--		Typology_TypologyID,
	--		ParentSector_SectorId
	--	)
	--VALUES
	--	(
	--		'Agricultural Residues',
	--		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'MainSubSector'),
	--		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
	--		(SELECT SectorId FROM [NCCRDv2].dbo.Sector WHERE [Value] = 'Agriculture, Forestry & other Land Use')
	--	)

	--SubSector--
	INSERT INTO
		[NCCRDv2].dbo.Sector
		(
			[Value],
			SectorType_SectorTypeId,
			Typology_TypologyID,
			ParentSector_SectorId
		)
	SELECT
		SS.SubSectorType,
		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'SubSector'),
		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
		PS.SectorId
	FROM
		[NCCRD].[dbo].[tb_erm_Mitigation_SubSector] SS
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_Mitigation_MainSubSector] MSS
		ON SS.MainSubSectorId = MSS.MainSubSectorId
	INNER JOIN
		(
			SELECT
				S.*
			FROM
				[NCCRDv2].dbo.Sector S
			INNER JOIN
				[NCCRDv2].dbo.SectorType ST
				ON S.SectorType_SectorTypeId = ST.SectorTypeId
			INNER JOIN
				[NCCRDv2].dbo.Typology T
				ON T.TypologyID = S.Typology_TypologyID
			WHERE
				ST.Name = 'MainSubSector'	
				AND
				T.Value = 'Mitigation'		
		) PS
		ON PS.Value = MSS.MainSubSectorType

	--INSERT INTO
	--	[NCCRDv2].dbo.Sector
	--	(
	--		[Value],
	--		SectorType_SectorTypeId,
	--		Typology_TypologyID,
	--		ParentSector_SectorId
	--	)
	--VALUES
	--	(
	--		'Mustard Crop',
	--		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'SubSector'),
	--		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
	--		(SELECT SectorId FROM [NCCRDv2].dbo.Sector WHERE [Value] = 'Agricultural Residues')
	--	),
	--	(
	--		'Other Kinds',
	--		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'SubSector'),
	--		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
	--		(SELECT SectorId FROM [NCCRDv2].dbo.Sector WHERE [Value] = 'Agricultural Residues')
	--	),
	--	(
	--		'Poutry Litter',
	--		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'SubSector'),
	--		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
	--		(SELECT SectorId FROM [NCCRDv2].dbo.Sector WHERE [Value] = 'Agricultural Residues')
	--	),
	--	(
	--		'Rice Husk',
	--		(SELECT SectorTypeId FROM [NCCRDv2].dbo.SectorType WHERE [Name] = 'SubSector'),
	--		(SELECT TypologyID FROM [NCCRDv2].dbo.Typology WHERE [Value] = 'Mitigation'),
	--		(SELECT SectorId FROM [NCCRDv2].dbo.Sector WHERE [Value] = 'Agricultural Residues')
	--	)

END

--SELECT * FROM [NCCRDv2].dbo.SectorType ST

SELECT
	TP.Value as [Typology],
	ST.Name as [SectorType],
	PS.Value as [ParentSector],
	'<---->' as [ ],
	S.*
FROM
	[NCCRDv2].dbo.Sector S
INNER JOIN
	[NCCRDv2].dbo.SectorType ST
	ON ST.SectorTypeId = S.SectorType_SectorTypeId
INNER JOIN
	[NCCRDv2].dbo.Typology TP
	ON TP.TypologyID = S.Typology_TypologyID
LEFT OUTER JOIN
	[NCCRDv2].dbo.Sector PS
	ON PS.SectorId = S.ParentSector_SectorId
ORDER BY
	TP.Value,
	ST.Name,
	PS.Value,
	S.Value
