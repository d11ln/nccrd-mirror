-- ## NCCRD Data Migration Script ## --
USE NCCRD_TEST
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_npclean_string] 
(
	@strIn AS VARCHAR(1000)
)
RETURNS VARCHAR(1000)
AS
BEGIN
	DECLARE @iPtr AS INT
	SET @iPtr = PATINDEX('%[^ -~0-9A-Z]%', @strIn COLLATE LATIN1_GENERAL_BIN)

	WHILE @iPtr > 0 
	BEGIN
		SET @strIn = REPLACE(@strIn COLLATE LATIN1_GENERAL_BIN, SUBSTRING(@strIn, @iPtr, 1), '#')
		SET @iPtr = PATINDEX('%[^ -~0-9A-Z]%', @strIn COLLATE LATIN1_GENERAL_BIN)
	END

	RETURN @strIn
END
GO

USE MASTER

--Typology--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.Typology) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.Typology
		(
			[Value]
		)
	VALUES
		('Mitigation'),
		('Adaptation'),
		('Research'),
		('Undefined')
END

--ProjectType--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.ProjectType) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.ProjectType
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.ProjectStatus) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.ProjectStatus
		(
			[Value]
		)
	VALUES
		('Planned'),
		('Adopted'),
		('In progress'),
		('Implemented'),
		('Expired'),
		('Published')
END

--CarbonCredit--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.CarbonCredit) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.CarbonCredit
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.CarbonCreditMarket) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.CarbonCreditMarket
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.CDMStatus) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.CDMStatus
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.ValidationStatus) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.ValidationStatus
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.CDMMethodology) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.CDMMethodology
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.VoluntaryGoldStandard) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.VoluntaryGoldStandard
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

--ResearchType--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.ResearchType) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.ResearchType
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.TargetAudience) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.TargetAudience
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.AdaptationPurpose) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.AdaptationPurpose
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.FundingStatus) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.FundingStatus
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

--LocationType--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.LocationType) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.LocationType
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
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.ProjectSubType) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.ProjectSubType
		(
			[Value],
			ProjectTypeId
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
		[NCCRD_TEST].[dbo].[ProjectType] PT
		ON PT.[Value] = LU.ItemDisplay		
END

--Funder--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].dbo.Funders) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].dbo.Funders
		(
			FundingAgency,
			PartnerDepsOrgs,
			FundingStatusId
		)
	SELECT DISTINCT
		FND.FundingOrganisation,
		FND.FundingPartner,
		FS.FundingStatusId
	FROM

		[NCCRD].[dbo].[tb_erm_project_details] FND
	LEFT OUTER JOIN
		(
			SELECT
				PLV.*,
				FS.FundingStatusId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[FundingStatus] FS
				ON FS.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Funding Status'
		) FS
		ON FS.ItemNum = FND.FUNDINGSTATUS
	WHERE
		FND.FundingOrganisation <> ''
	ORDER BY
		FND.FundingOrganisation
END

--Person--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[Person]) = 0
BEGIN
INSERT INTO
	[NCCRD_TEST].[dbo].[Person]
    (
		[EmailAddress]
        ,[FirstName]
        ,[Surname]
        ,[Organisation]
        ,[PhoneNumber]
        ,[MobileNumber]
	)
    SELECT
		R.AppUserName,
		R.UserFirstName,
		R.UserSurname,
		R.UserOrganisation,
		R.UserPhoneNumber,
		R.UserMobileNumber
	FROM
		[NCCRD].[dbo].[tb_erm_appusers] R	
	WHERE
		R.UserFirstName IS NOT NULL
END

IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[Region]) = 0
BEGIN
	--Province--
	INSERT INTO
		[NCCRD_TEST].[dbo].[Region]
		(
			RegionName,
			LocationTypeId
		)
	SELECT
		P.ProvinceName,
		(SELECT LocationTypeId FROM [NCCRD_TEST].[dbo].LocationType WHERE [Value] = 'Province')
	FROM
		[NCCRD].[dbo].[tb_erm_Province] P

	--DistrictMunicipality--
	INSERT INTO
		[NCCRD_TEST].[dbo].[Region]
		(
			RegionName,
			LocationTypeId,
			ParentRegionId
		)
	SELECT
		DMP.MetroName,
		(SELECT LocationTypeId FROM [NCCRD_TEST].[dbo].LocationType WHERE [Value] = 'DistrictMunicipality'),
		REG.RegionId
	FROM
		[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_Province] PRV
		ON PRV.ProvinceID = DMP.ProvinceID
	INNER JOIN
		[NCCRD_TEST].[dbo].[Region] REG
		ON REG.RegionName = PRV.ProvinceName
		AND REG.LocationTypeId = (SELECT LocationTypeId FROM [NCCRD_TEST].[dbo].LocationType WHERE [Value] = 'Province')

	--LocalMunicipality--
	INSERT INTO
		[NCCRD_TEST].[dbo].[Region]
		(
			RegionName,
			LocationTypeId,
			ParentRegionId
		)
	SELECT
		LMP.LocalMunicipalityName,
		(SELECT LocationTypeId FROM [NCCRD_TEST].[dbo].LocationType WHERE [Value] = 'LocalMunicipality'),
		REG.RegionId
	FROM
		[NCCRD].[dbo].[tb_erm_Local_Municipalities] LMP
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
		ON DMP.MetroID = LMP.MetroID
	INNER JOIN
		[NCCRD_TEST].[dbo].[Region] REG
		ON REG.RegionName = DMP.MetroName
		AND REG.LocationTypeId = (SELECT LocationTypeId FROM [NCCRD_TEST].[dbo].LocationType WHERE [Value] = 'DistrictMunicipality')
END

--PROJECTS--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[Project]) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].[dbo].[Project]
		(
			ProjectTitle,
			ProjectDescription,
			LeadAgent,
			HostPartner,
			HostOrganisation,
			StartYear,
			EndYear,
			AlternativeContact,
			AlternativeContactEmail,
			Link,
			ValidationComments,
			BudgetLower,
			BudgetUpper,
			ProjectTypeId,
			ProjectSubTypeId,
			ProjectManagerId,
			ValidationStatusID
		)
	SELECT
		PD.ProjectTitle,
		PD.[Description],
		PD.LeadAgent,
		PD.HostPartner,
		PD.HostOrganisation,
		PD.StartYear + 2000,
		PD.EndYear + 2000,
		PD.AlternativeContact,
		PD.AlternativeContactEmail,
		PD.Link,
		PD.VALIDATIONCOMMENTS,
		PD.BudgetLower,
		PD.BudgetUpper,
		PTID.ProjectTypeId,
		PMD.ProjectTypeId,
		PRSN.PersonId,
		VS.ValidationStatusID
	FROM
		[NCCRD].[dbo].[tb_erm_project_details] PD
	INNER JOIN
		(
			SELECT
				PT.ProjectTypeId,
				PLV.ItemNum
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[ProjectType] PT
				ON PT.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Type of Project'
		) PTID
		ON PD.TypeOfProject = PTID.ItemNum
	--INNER JOIN
	--	(
	--		SELECT
	--			PS.ProjectStatusId,
	--			PLV.ItemNum
	--		FROM
	--			[NCCRD].[dbo].[tb_erm_picklist] PL
	--		INNER JOIN
	--			[NCCRD].[dbo].[tb_erm_picklist_value] PLV
	--			ON PL.ListId = PLV.ListId
	--		INNER JOIN
	--			[NCCRD_TEST].[dbo].[ProjectStatus] PS
	--			ON PS.[Value] = PLV.ItemDisplay
	--		WHERE
	--			PL.ListName = 'Status'
	--	) PS
	--	ON PS.ItemNum = PD.[Status]
	INNER JOIN
		(
			SELECT
				*
			FROM
				[NCCRD].[dbo].[tb_erm_appusers] AUSR
			INNER JOIN
				[NCCRD_TEST].[dbo].[Person] PRSN
				ON PRSN.EmailAddress = AUSR.AppUserName
		) PRSN
		ON PRSN.AppUserID = PD.ProjectManager
	LEFT OUTER JOIN
		(
			SELECT
				PVS.ValidationStatusID,
				PLV.ItemNum
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[ValidationStatus] PVS
				ON PVS.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'DEAT Validation Status'
		) VS
		ON VS.ItemNum = PD.ValidationStatus
	LEFT OUTER JOIN
		(
			SELECT
				PST2.ProjectTypeId,
				MD.ProjectDetailsId
			FROM
				[NCCRD].[dbo].[tb_erm_mitigation_details] MD
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_Project_SubType] PST
				ON PST.ProjectSubTypeId = MD.ProjectSubType
			INNER JOIN
				[NCCRD_TEST].[dbo].[ProjectSubType] PST2
				ON PST2.[Value] = PST.ProjectSubType
		) PMD
		ON PMD.ProjectDetailsId = PD.ProjectDetailsId

		--Fix ProjectTitles with no-ascii characters--
		UPDATE
			[NCCRD_TEST].[dbo].[Project]
		SET
			ProjectTitle = [NCCRD_TEST].dbo.fn_npclean_string(LTRIM(RTRIM(ProjectTitle)))

		--ProjectFunders--
		INSERT INTO
			[NCCRD_TEST].[dbo].[ProjectFunder]
			(
				ProjectId,
				FunderId
			)
		SELECT
			P.ProjectId,
			FND.FunderId
		FROM
			[NCCRD].[dbo].[tb_erm_project_details] PD
		INNER JOIN
			[NCCRD_TEST].[dbo].[Project] P
			ON P.ProjectTitle = PD.ProjectTitle
		INNER JOIN
			[NCCRD_TEST].[dbo].[Funders] FND
			ON FND.FundingAgency = LTRIM(RTRIM(PD.FundingOrganisation))
END


--PROJECT LOCATION DATA--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[ProjectLocation]) = 0
BEGIN
	DECLARE @LD TABLE
	(
		OPID INT,
		OLID INT,
		NPID INT
	)

	INSERT INTO
		@LD
		(
			OPID,
			OLID,
			NPID
		)
	SELECT DISTINCT
		PD.ProjectDetailsId,
		PLD.ProjectLocationDataId,
		P.ProjectId
	FROM
		[NCCRD].[dbo].[tb_erm_Project_Location_Data] PLD
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = PLD.ProjectDetailsId
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle

	WHILE (SELECT COUNT(*) FROM @LD) > 0
	BEGIN
		DECLARE
			@OPID INT,
			@OLID INT,
			@NPID INT,
			@NLID INT

		SELECT TOP(1)
			@OPID = OPID,
			@OLID = OLID,
			@NPID = NPID
		FROM
			@LD

		INSERT INTO
			[NCCRD_TEST].[dbo].[Location]
			(
				LatDegree,
				LatMinutes,
				LatSeconds,
				LatDirection,
				LatCalculated,
				LonDegree,
				LonMinutes,
				LonSeconds,
				LonDirection,
				LonCalculated
			)
		SELECT
			PLD.LatDegree,
			PLD.LatMinutes,
			PLD.LatSeconds,
			PLD.LatDirection,
			PLD.LatCalculated,
			PLD.LonDegree,
			PLD.LonMinutes,
			PLD.LonSeconds,
			PLD.LonDirection,
			PLD.LonCalculated
		FROM
			[NCCRD].[dbo].[tb_erm_Project_Location_Data] PLD
		WHERE
			PLD.ProjectLocationDataId = @OLID

		SET @NLID = @@IDENTITY

		INSERT INTO
			[NCCRD_TEST].[dbo].[ProjectLocation]
			(
				LocationId,
				ProjectId
			)
		VALUES
			(@NLID, @NPID)

		DELETE TOP(1) FROM @LD
	END
END


--PROJECT REGION--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].ProjectRegion) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].[dbo].[ProjectRegion]
		(
			ProjectId,
			RegionId
		)
	SELECT DISTINCT
		PR.ProjectId,
		PR.RegionId
	FROM
	(
		SELECT
			P.ProjectId,
			ISNULL(LMP.RegionId, ISNULL(DMP.RegionId, PRV.RegionId)) AS [RegionId]
		FROM
			[NCCRD].[dbo].[tb_erm_project_details] PD
		INNER JOIN
			[NCCRD_TEST].[dbo].[Project] P
			ON P.ProjectTitle = PD.ProjectTitle
		INNER JOIN
			[NCCRD].[dbo].[tb_erm_Project_Location_Data] PLD
			ON PLD.ProjectDetailsId = PD.ProjectDetailsId
		LEFT OUTER JOIN
			(
				SELECT
					LMP.LocalMunicipalityID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Local_Municipalities] LMP
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = LMP.LocalMunicipalityName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'LocalMunicipality'
			) LMP
			ON LMP.LocalMunicipalityID = PLD.LocalMunicipality
		LEFT OUTER JOIN
			(
				SELECT
					DMP.MetroID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = DMP.MetroName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'DistrictMunicipality'
			) DMP
			ON DMP.MetroID = PLD.Metro
		LEFT OUTER JOIN
			(
				SELECT
					PRV.ProvinceID,
					REg.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Province] PRV
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = PRV.ProvinceName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'Province'
			) PRV
			ON PRV.ProvinceID = PLD.Province

		UNION ALL

		SELECT
			P.ProjectId,
			ISNULL(LMP.RegionId, ISNULL(DMP.RegionId, PRV.RegionId)) AS [RegionId]
		FROM
			[NCCRD].[dbo].[tb_erm_project_details] PD
		INNER JOIN
			[NCCRD_TEST].[dbo].[Project] P
			ON P.ProjectTitle = PD.ProjectTitle
		INNER JOIN
			[NCCRD].[dbo].[tb_erm_Project_Adaptation_Data] PAD
			ON PAD.ProjectDetailsId = PD.ProjectDetailsId
		LEFT OUTER JOIN
			(
				SELECT
					LMP.LocalMunicipalityID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Local_Municipalities] LMP
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = LMP.LocalMunicipalityName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'LocalMunicipality'
			) LMP
			ON LMP.LocalMunicipalityID = PAD.LocalMunicipality
		LEFT OUTER JOIN
			(
				SELECT
					DMP.MetroID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = DMP.MetroName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'DistrictMunicipality'
			) DMP
			ON DMP.MetroID = PAD.Municipality
		LEFT OUTER JOIN
			(
				SELECT
					PRV.ProvinceID,
					REg.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Province] PRV
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = PRV.ProvinceName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'Province'
			) PRV
			ON PRV.ProvinceID = PAD.Province

		UNION ALL

		SELECT
			P.ProjectId,
			ISNULL(LMP.RegionId, ISNULL(DMP.RegionId, PRV.RegionId)) AS [RegionId]
		FROM
			[NCCRD].[dbo].[tb_erm_project_details] PD
		INNER JOIN
			[NCCRD_TEST].[dbo].[Project] P
			ON P.ProjectTitle = PD.ProjectTitle
		INNER JOIN
			[NCCRD].[dbo].[tb_erm_Project_Research_Data] PRD
			ON PRD.ProjectDetailsId = PD.ProjectDetailsId
		LEFT OUTER JOIN
			(
				SELECT
					LMP.LocalMunicipalityID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Local_Municipalities] LMP
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = LMP.LocalMunicipalityName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'LocalMunicipality'
			) LMP
			ON LMP.LocalMunicipalityID = PRD.LocalMunicipality
		LEFT OUTER JOIN
			(
				SELECT
					DMP.MetroID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = DMP.MetroName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'DistrictMunicipality'
			) DMP
			ON DMP.MetroID = PRD.Municipality
		LEFT OUTER JOIN
			(
				SELECT
					PRV.ProvinceID,
					REG.RegionId
				FROM
					[NCCRD].[dbo].[tb_erm_Province] PRV
				INNER JOIN
					[NCCRD_TEST].[dbo].[Region] REG
					ON REG.RegionName = PRV.ProvinceName
				INNER JOIN
					[NCCRD_TEST].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'Province'
			) PRV
			ON PRV.ProvinceID = PRD.Province
	) PR
END

--[MITIGATION DETAILS]--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[MitigationDetails]) = 0
BEGIN
	--[VoluntaryMethodology]--
	INSERT INTO
		[NCCRD_TEST].[dbo].[VoluntaryMethodology]
		(
			[Value]
		)
	SELECT DISTINCT
		RTRIM(LTRIM(MD.VolMethodoloy))
	FROM
		[NCCRD].[dbo].[tb_erm_mitigation_details] MD
	WHERE
		RTRIM(LTRIM(MD.VolMethodoloy)) <> ''

	--[MitigationDetails]--
	INSERT INTO
		[NCCRD_TEST].[dbo].[MitigationDetails]
		(
			CarbonCreditId,
			CarbonCreditMarketId,
			CDMStatusId,
			CDMMethodologyId,
			VoluntaryMethodologyId,
			OtherDescription,
			CDMProjectNumber,
			ProjectId,
			ProjectStatusId
		)
	SELECT
		CC.CarbonCreditId,
		CCM.CarbonCreditMarketId,
		CDM.CDMStatusId,
		CDM2.CDMMethodologyId,
		VM.VoluntaryMethodologyId,
		MD.otherDesc,
		LTRIM(RTRIM(MD.CDMProjectNumber)),
		P.ProjectId,
		1
	FROM
		[NCCRD].[dbo].[tb_erm_mitigation_details] MD
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = MD.ProjectDetailsId
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle
	LEFT OUTER JOIN
		(
			SELECT
				PLV.ItemNum,
				CC.CarbonCreditId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[CarbonCredit] CC
				ON CC.Value = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Carbon credits'
		) CC
		ON CC.ItemNum = MD.CarbonCredit
	LEFT OUTER JOIN
		(
			SELECT
				PLV.ItemNum,
				CCM.CarbonCreditMarketId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[CarbonCreditMarket] CCM
				ON CCM.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Carbon credit Market'
		) CCM
		ON CCM.ItemNum = MD.CarbonCreditMarket
	LEFT OUTER JOIN
		(
			SELECT
				PLV.ItemNum,
				CDM.CDMStatusId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[CDMStatus] CDM
				ON CDM.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'CDM Status'
		) CDM
		ON CDM.ItemNum = MD.CDMStatus
	LEFT OUTER JOIN
		(
			SELECT
				PLV.ItemNum,
				CDM.CDMMethodologyId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[CDMMethodology] CDM
				ON CDM.Value = PLV.ItemDisplay
			WHERE
				PL.ListName = 'CDM Approved Methodology'
		) CDM2
		ON CDM2.ItemNum = MD.CDMMethodoloy
	LEFT OUTER JOIN
		[NCCRD_TEST].[dbo].[VoluntaryMethodology] VM
		ON VM.Value = MD.VolMethodoloy
	
	--[MitigationEmissionsData]--
	INSERT INTO
		[NCCRD_TEST].[dbo].[MitigationEmissionsData]
		(
			[Year],
			CO2,
			CH4,
			CH4_CO2e,
			N2O,
			N2O_CO2e,
			HFC,
			HFC_CO2e,
			PFC,
			PFC_CO2e,
			SF6,
			SF6_CO2e,
			Hydro,
			Hydro_CO2e,
			Tidal,
			Tidal_CO2e,
			Wind,
			Wind_CO2e,
			Solar,
			Solar_CO2e,
			FossilFuelElecRed,
			FossilFuelElecRed_CO2e,
			BioWaste,
			BioWaste_CO2e,
			Geothermal,
			Geothermal_CO2e,
			ProjectId
		)
	SELECT
		MED.[Year],
		MED.CO2,
		MED.CH4,
		MED.CH4_CO2e,
		MED.N2O,
		MED.N2O_CO2e,
		MED.HFC,
		MED.HFC_CO2e,
		MED.PFC,
		MED.PFC_CO2e,
		MED.SF6,
		MED.SF6_CO2e,
		MED.Hydro,
		MED.Hydro_CO2e,
		MED.Tidal,
		MED.Tidal_CO2e,
		MED.Wind,
		MED.Wind_CO2e,
		MED.Solar,
		MED.Solar_CO2e,
		MED.FossilFuelElecRed,
		MED.FossilFuelElecRed_CO2e,
		MED.BioWaste,
		MED.BioWaste_CO2e,
		MED.Geothermal,
		MED.Geothermal_CO2e,
		P.ProjectId
	FROM
		[NCCRD].[dbo].[tb_erm_Mitigation_Emissions_Data] MED
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_Project_Location_Data] PLD
		ON PLD.ProjectLocationDataId = MED.ProjectLocationDataId
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = PLD.ProjectDetailsId
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle

	--PROJECT STATUS--
	UPDATE
		MD
	SET
		MD.ProjectStatusId = ST.ProjectStatusId
	FROM
		[NCCRD_TEST].[dbo].[MitigationDetails] MD
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectId = MD.ProjectId
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON [NCCRD_TEST].[dbo].[fn_npclean_string](P.ProjectTitle) = [NCCRD_TEST].[dbo].[fn_npclean_string](LTRIM(RTRIM(PD.ProjectTitle)))
	INNER JOIN
	(
		SELECT
			PLV.*
		FROM
			[NCCRD].[dbo].[tb_erm_picklist] PL
		INNER JOIN
			[NCCRD].[dbo].[tb_erm_picklist_value] PLV
			ON PL.ListId = PLV.ListId
		WHERE
			PL.ListName = 'Status'		
	) PS
	ON PS.ItemNum = PD.[Status]
	INNER JOIN
		(
			SELECT
				*,
				(CASE
					WHEN PS.[Value] = 'In progress' THEN 'Operational'
					WHEN PS.[Value] = 'Planned' THEN 'Under Development'
					WHEN PS.[Value] = 'Implemented' THEN 'Complete'
					ELSE PS.[Value]
				END) AS [OldValue] 
			FROM
				[NCCRD_TEST].[dbo].[ProjectStatus] PS
		) ST
		ON ST.OldValue = PS.ItemDisplay
END


--[ADAPTATION DETAILS]--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[AdaptationDetails]) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].[dbo].[AdaptationDetails]
		(
			AdaptationPurposeId,
			ProjectId,
			ProjectStatusId
		)
	SELECT
		AP.AdaptationPurposeId,
		P.ProjectId,
		1
	FROM
		[NCCRD].[dbo].[tb_erm_Project_Adaptation_Data] PAD
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = PAD.ProjectDetailsId
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle
	INNER JOIN
		(
			SELECT
				PLV.ItemNum,
				AP.AdaptationPurposeId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[AdaptationPurpose] AP
				ON AP.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Purpose of adaptation'			
		) AP
		ON AP.ItemNum = PAD.PurposeOfAdaptation

	--PROJECT STATUS--
	UPDATE
		AD
	SET
		AD.ProjectStatusId = ST.ProjectStatusId
	FROM
		[NCCRD_TEST].[dbo].[AdaptationDetails] AD
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectId = AD.ProjectId
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON [NCCRD_TEST].[dbo].[fn_npclean_string](P.ProjectTitle) = [NCCRD_TEST].[dbo].[fn_npclean_string](LTRIM(RTRIM(PD.ProjectTitle)))
	INNER JOIN
	(
		SELECT
			PLV.*
		FROM
			[NCCRD].[dbo].[tb_erm_picklist] PL
		INNER JOIN
			[NCCRD].[dbo].[tb_erm_picklist_value] PLV
			ON PL.ListId = PLV.ListId
		WHERE
			PL.ListName = 'Status'		
	) PS
	ON PS.ItemNum = PD.[Status]
	INNER JOIN
		(
			SELECT
				*,
				(CASE
					WHEN PS.[Value] = 'In progress' THEN 'Operational'
					WHEN PS.[Value] = 'Planned' THEN 'Under Development'
					WHEN PS.[Value] = 'Implemented' THEN 'Complete'
					ELSE PS.[Value]
				END) AS [OldValue] 
			FROM
				[NCCRD_TEST].[dbo].[ProjectStatus] PS
		) ST
		ON ST.OldValue = PS.ItemDisplay
END

--[RESEARCH DETAILS]--
IF (SELECT COUNT(*) FROM [NCCRD_TEST].[dbo].[ResearchDetails]) = 0
BEGIN
	INSERT INTO
		[NCCRD_TEST].[dbo].[ResearchDetails]
		(
			Author,
			PaperLink,
			ResearchTypeId,
			TargetAudienceId,
			ProjectId
		)
	SELECT
		RD.Author,
		RD.Paper,
		RT.ResearchTypeId,
		TA.TargetAudienceId,
		P.ProjectId
	FROM
		[NCCRD].[dbo].[tb_erm_Project_Research_Data] RD
	INNER JOIN
		(
			SELECT
				PLV.ItemNum,
				RT.ResearchTypeId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[ResearchType] RT
				ON RT.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Type of research'			
		) RT
		ON RT.ItemNum = RD.TypeOfResearch
	INNER JOIN
		(
			SELECT
				PLV.ItemNum,
				TA.TargetAudienceId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRD_TEST].[dbo].[TargetAudience] TA
				ON TA.Value = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Target audience'			
		) TA
		ON TA.ItemNum = RD.TargetAudience
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = RD.ProjectDetailsId
	INNER JOIN
		[NCCRD_TEST].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle
END
