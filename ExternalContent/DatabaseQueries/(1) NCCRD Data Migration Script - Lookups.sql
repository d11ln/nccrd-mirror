--(1) NCCRD Data Migration Script - Lookups--
USE master

--Title--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.Title) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.Title
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'User Title'
	ORDER BY
		PLV.ItemOrder
END

--Typology--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.Typology) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.Typology
		(
			[Value]
		)
	VALUES
		('Mitigation'),
		('Adaptation'),
		('Research'),
		('UNDEFINED')
END

--ProjectType--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.ProjectType) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.ProjectType
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Type of Project'
	ORDER BY
		PLV.ItemOrder
END

--ProjectStatus--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.ProjectStatus) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.ProjectStatus
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Status'
	ORDER BY
		PLV.ItemOrder
END

--CarbonCredit--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.CarbonCredit) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.CarbonCredit
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Carbon credits'
	ORDER BY
		PLV.ItemOrder
END

--CarbonCreditMarket--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.CarbonCreditMarket) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.CarbonCreditMarket
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Carbon credit Market'
	ORDER BY
		PLV.ItemOrder
END

--CDMStatus--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.CDMStatus) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.CDMStatus
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'CDM Status'
	ORDER BY
		PLV.ItemOrder
END

--ValidationStatus--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.ValidationStatus) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.ValidationStatus
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'DEAT Validation Status'
	ORDER BY
		PLV.ItemOrder
END

--CDMMethodology--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.CDMMethodology) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.CDMMethodology
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'CDM Approved Methodology'
	ORDER BY
		PLV.ItemOrder
END

--VoluntaryGoldStandard--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.VoluntaryGoldStandard) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.VoluntaryGoldStandard
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Voluntary Gold Standard'
	ORDER BY
		PLV.ItemOrder
END

--VoluntaryMethodology--
--IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.VoluntaryMethodology) = 0
--BEGIN
--	INSERT INTO
--		[NCCRDv2].dbo.VoluntaryMethodology
--		(
--			[Value]
--		)
--	SELECT
--		PLV.ItemDisplay
--	FROM
--		[NCCRD].dbo.tb_erm_picklist PL
--	INNER JOIN
--		[NCCRD].dbo.tb_erm_picklist_value PLV
--		ON PL.ListId = PLV.ListId
--	WHERE
--		PL.ListName = 'Voluntary Methodology'
--	ORDER BY
--		PLV.ItemOrder
--END

--ResearchType--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.ResearchType) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.ResearchType
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Type of research'
	ORDER BY
		PLV.ItemOrder
END

--TargetAudience--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.TargetAudience) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.TargetAudience
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Target audience'
	ORDER BY
		PLV.ItemOrder
END

--AdaptationPurpose--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.AdaptationPurpose) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.AdaptationPurpose
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Purpose of adaptation'
	ORDER BY
		PLV.ItemOrder
END

--FundingStatus--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.FundingStatus) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.FundingStatus
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Funding Status'
	ORDER BY
		PLV.ItemOrder
END

--Country--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.Country) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.Country
		(
			[Value]
		)
	SELECT
		PLV.ItemDisplay
	FROM
		[NCCRD].dbo.tb_erm_picklist PL
	INNER JOIN
		[NCCRD].dbo.tb_erm_picklist_value PLV
		ON PL.ListId = PLV.ListId
	WHERE
		PL.ListName = 'Country'
	ORDER BY
		PLV.ItemOrder
END

--LocationType--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.LocationType) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.LocationType
		(
			[Value]
		)
	VALUES
		('Ward'),
		('LocalMunicipality'),
		('DistrictMunicipality'),
		('Province')
END

--ProjectSubType--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.ProjectSubType) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.ProjectSubType
		(
			[Value],
			ProjectType_ProjectTypeId
		)
	SELECT
		PST.ProjectSubType,
		PT.ProjectTypeId
	FROM
		[NCCRD].[dbo].[tb_erm_Project_SubType] PST
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
				PL.ListName = 'Type of Project'
		) LU
		ON LU.ItemNum = PST.ProjectTypeId
	INNER JOIN
		[NCCRDv2].[dbo].[ProjectType] PT
		ON PT.[Value] = LU.ItemDisplay		
END

--Funder--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.Funder) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.Funder
		(
			[Name]
		)
	SELECT DISTINCT
		FND.Funder
	FROM
		(
			SELECT LTRIM(RTRIM(HostPartner)) AS [Funder] FROM [NCCRD].[dbo].[tb_erm_project_details]
			UNION ALL
			SELECT LTRIM(RTRIM(FundingOrganisation)) AS [Funder] FROM [NCCRD].[dbo].[tb_erm_project_details]
			WHERE FundingOrganisation NOT LIKE '%French Development Bank'
			UNION ALL
			SELECT LTRIM(RTRIM(FundingPartner)) AS [Funder] FROM [NCCRD].[dbo].[tb_erm_project_details]
			UNION ALL
			SELECT 'French Development Bank' AS [Funder]
		) FND
	WHERE
		FND.Funder <> ''
	ORDER BY
		FND.Funder
END

--SELECT DEFAULT/TEST DATA--
SELECT * FROM [NCCRDv2].dbo.Title
SELECT * FROM [NCCRDv2].dbo.Typology
SELECT * FROM [NCCRDv2].dbo.ProjectType
SELECT * FROM [NCCRDv2].dbo.ProjectStatus
SELECT * FROM [NCCRDv2].dbo.CarbonCredit
SELECT * FROM [NCCRDv2].dbo.CarbonCreditMarket
SELECT * FROM [NCCRDv2].dbo.CDMStatus
SELECT * FROM [NCCRDv2].dbo.ValidationStatus
SELECT * FROM [NCCRDv2].dbo.CDMMethodology
SELECT * FROM [NCCRDv2].dbo.VoluntaryGoldStandard
SELECT * FROM [NCCRDv2].dbo.VoluntaryMethodology
SELECT * FROM [NCCRDv2].dbo.ResearchType
SELECT * FROM [NCCRDv2].dbo.AdaptationPurpose
SELECT * FROM [NCCRDv2].dbo.FundingStatus
SELECT * FROM [NCCRDv2].dbo.TargetAudience
SELECT * FROM [NCCRDv2].dbo.Country
SELECT * FROM [NCCRDv2].dbo.LocationType
SELECT * FROM [NCCRDv2].dbo.ProjectSubType
SELECT * FROM [NCCRDv2].dbo.Funder
