-- ## NCCRD Data Migration Script ## --
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
		[NCCRDv2].[dbo].[ProjectType] PT
		ON PT.[Value] = LU.ItemDisplay		
END

--Funder--
IF (SELECT COUNT(*) FROM [NCCRDv2].dbo.Funders) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].dbo.Funders
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
			SectorTypeId,
			TypologyID
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
			SectorTypeId,
			TypologyID
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
			SectorTypeId,
			TypologyID,
			ParentSectorId
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
				ON S.SectorTypeId = ST.SectorTypeId
			INNER JOIN
				[NCCRDv2].dbo.Typology T
				ON T.TypologyID = S.TypologyID
			WHERE
				ST.Name = 'HostSector'	
				AND
				T.Value = 'Mitigation'		
		) PS
		ON PS.Value = HS.ItemDisplay

	--SubSector--
	INSERT INTO
		[NCCRDv2].dbo.Sector
		(
			[Value],
			SectorTypeId,
			TypologyID,
			ParentSectorId
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
				ON S.SectorTypeId = ST.SectorTypeId
			INNER JOIN
				[NCCRDv2].dbo.Typology T
				ON T.TypologyID = S.TypologyID
			WHERE
				ST.Name = 'MainSubSector'	
				AND
				T.Value = 'Mitigation'		
		) PS
		ON PS.Value = MSS.MainSubSectorType
END

IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[UserRoles]) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].[dbo].[UserRoles]
		(
			RoleName
		)	
	SELECT
		R.RoleName
	FROM
		[NCCRD].[dbo].[tb_erm_roles] R

	INSERT INTO
		[NCCRDv2].[dbo].[UserRoles]
		(
			RoleName
		)
	VALUES
		('Funder'),	
		('ProjectOwner'),	
		('OptionOwner')
END

IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[Users]) = 0
BEGIN
INSERT INTO
	[NCCRDv2].[dbo].[Users]
    (
		[Username]
        ,[Password]
        ,[Blocked]
        ,[FirstName]
        ,[Surname]
        ,[JobTitle]
        ,[Organisation]
        ,[PhysicalAddressLine1]
        ,[PhysicalAddressLine2]
        ,[PhysicalAddressLine3]
        ,[PhysicalAddressTown]
        ,[PhysicalAddressPostalCode]
        ,[PhysicalAddressProvince]
        ,[PhysicalAddressCountry]
        ,[PostalAddressLine1]
        ,[PostalAddressLine2]
        ,[PostalAddressLine3]
        ,[PostalAddressTown]
        ,[PostalAddressPostalCode]
        ,[PostalAddressProvince]
        ,[PostalAddressCountry]
        ,[PhoneNumber]
        ,[MobileNumber]
        ,[FaxNumber]
        ,[TitleId]
        ,[UserRoleId]
	)
    SELECT
		R.AppUserName,
		R.AppUserpwd,
		R.IsBlock,
		R.UserFirstName,
		R.UserSurname,
		R.UserJobTitle,
		R.UserOrganisation,
		R.PhysLine1,
		R.PhysLine2,
		R.PhysLine3,
		R.PhyTown,
		R.PhyCode,
		R.PhyProvince,
		LUC.ItemDisplay,
		R.PostLine1,
		R.PostLine2,
		R.PostLine3,
		R.PostTown,
		R.PostCode,
		R.PostProvince,
		R.PostCountry,
		R.UserPhoneNumber,
		R.UserMobileNumber,
		R.UserFax,
		T.TitleId,
		UR.UserRoleId
	FROM
		[NCCRD].[dbo].[tb_erm_appusers] R
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
				PL.ListName = 'User Title'
		) LUT
		ON LUT.ItemNum = R.UserTitle
	INNER JOIN
		[NCCRDv2].[dbo].Title T
		ON T.[Value] = LUT.ItemDisplay
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_roles] LUR
		ON LUR.RoleID = R.RoleID
	INNER JOIN
		[NCCRDv2].[dbo].UserRoles UR
		ON LUR.RoleName = UR.RoleName
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
				PL.ListName = 'Country'
		) LUC
		ON LUC.ItemNum = R.PhyCountry
		
END

IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[Region]) = 0
BEGIN
	--Province--
	INSERT INTO
		[NCCRDv2].[dbo].[Region]
		(
			RegionName,
			LocationTypeId
		)
	SELECT
		P.ProvinceName,
		(SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'Province')
	FROM
		[NCCRD].[dbo].[tb_erm_Province] P

	--DistrictMunicipality--
	INSERT INTO
		[NCCRDv2].[dbo].[Region]
		(
			RegionName,
			LocationTypeId,
			ParentRegionId
		)
	SELECT
		DMP.MetroName,
		(SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'DistrictMunicipality'),
		REG.RegionId
	FROM
		[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_Province] PRV
		ON PRV.ProvinceID = DMP.ProvinceID
	INNER JOIN
		[NCCRDv2].[dbo].[Region] REG
		ON REG.RegionName = PRV.ProvinceName
		AND REG.LocationTypeId = (SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'Province')

	--LocalMunicipality--
	INSERT INTO
		[NCCRDv2].[dbo].[Region]
		(
			RegionName,
			LocationTypeId,
			ParentRegionId
		)
	SELECT
		LMP.LocalMunicipalityName,
		(SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'LocalMunicipality'),
		REG.RegionId
	FROM
		[NCCRD].[dbo].[tb_erm_Local_Municipalities] LMP
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_Metro_DistrictMunicipality] DMP
		ON DMP.MetroID = LMP.MetroID
	INNER JOIN
		[NCCRDv2].[dbo].[Region] REG
		ON REG.RegionName = DMP.MetroName
		AND REG.LocationTypeId = (SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'DistrictMunicipality')
END

--PROJECTS--
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[Project]) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].[dbo].[Project]
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
			ProjectStatusId,
			ProjectManagerId,
			ValidationStatusID
		)
	SELECT
		PD.ProjectTitle,
		PD.[Description],
		PD.LeadAgent,
		PD.HostPartner,
		PD.HostOrganisation,
		PD.StartYear,
		PD.EndYear,
		PD.AlternativeContact,
		PD.AlternativeContactEmail,
		PD.Link,
		PD.VALIDATIONCOMMENTS,
		PD.BudgetLower,
		PD.BudgetUpper,
		PTID.ProjectTypeId,
		PMD.ProjectTypeId,
		PS.ProjectStatusId,
		USR.UserId,
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
				[NCCRDv2].[dbo].[ProjectType] PT
				ON PT.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Type of Project'
		) PTID
		ON PD.TypeOfProject = PTID.ItemNum
	INNER JOIN
		(
			SELECT
				PS.ProjectStatusId,
				PLV.ItemNum
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRDv2].[dbo].[ProjectStatus] PS
				ON PS.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Status'
		) PS
		ON PS.ItemNum = PD.[Status]
	INNER JOIN
		(
			SELECT
				*
			FROM
				[NCCRD].[dbo].[tb_erm_appusers] AUSR
			INNER JOIN
				[NCCRDv2].[dbo].[Users] USR
				ON USR.Username = AUSR.AppUserName
		) USR
		ON USR.AppUserID = PD.ProjectManager
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
				[NCCRDv2].[dbo].[ValidationStatus] PVS
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
				[NCCRDv2].[dbo].[ProjectSubType] PST2
				ON PST2.[Value] = PST.ProjectSubType
		) PMD
		ON PMD.ProjectDetailsId = PD.ProjectDetailsId

		--ProjectFunders--
		INSERT INTO
			[NCCRDv2].[dbo].[ProjectFunder]
			(
				ProjectId,
				FunderId,
				FundingStatusId
			)
		SELECT
			P.ProjectId,
			FND.FunderId,
			FS.FundingStatusId
		FROM
			[NCCRD].[dbo].[tb_erm_project_details] PD
		INNER JOIN
			[NCCRDv2].[dbo].[Project] P
			ON P.ProjectTitle = PD.ProjectTitle
		INNER JOIN
			[NCCRDv2].[dbo].[Funders] FND
			ON FND.[Name] = LTRIM(RTRIM(PD.FundingOrganisation))
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
					[NCCRDv2].[dbo].[FundingStatus] FS
					ON FS.[Value] = PLV.ItemDisplay
				WHERE
					PL.ListName = 'Funding Status'
			) FS
			ON FS.ItemNum = Pd.FUNDINGSTATUS
END


--PROJECT LOCATION DATA--
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[ProjectLocation]) = 0
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
		[NCCRDv2].[dbo].[Project] P
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
			[NCCRDv2].[dbo].[Location]
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
			[NCCRDv2].[dbo].[ProjectLocation]
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
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].ProjectRegion) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].[dbo].[ProjectRegion]
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
			[NCCRDv2].[dbo].[Project] P
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = LMP.LocalMunicipalityName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = DMP.MetroName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = PRV.ProvinceName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
			[NCCRDv2].[dbo].[Project] P
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = LMP.LocalMunicipalityName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = DMP.MetroName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = PRV.ProvinceName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
			[NCCRDv2].[dbo].[Project] P
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = LMP.LocalMunicipalityName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = DMP.MetroName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
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
					[NCCRDv2].[dbo].[Region] REG
					ON REG.RegionName = PRV.ProvinceName
				INNER JOIN
					[NCCRDv2].[dbo].[LocationType] LT
					ON LT.LocationTypeId = REG.LocationTypeId
				WHERE
					LT.[Value] = 'Province'
			) PRV
			ON PRV.ProvinceID = PRD.Province
	) PR
END


--PROJECT TYPOLOGY--
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[ProjectTypology]) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].[dbo].[ProjectTypology]
		(
			ProjectId,
			TypologyID
		)
	SELECT
		PT.ProjectId,
		PT.TypologyId
	FROM
		(
			SELECT	
				P.ProjectId,
				(SELECT TOP(1) T.TypologyID FROM [NCCRDv2].[dbo].[Typology] T WHERE T.[Value] = 'Mitigation') AS [TypologyId]
			FROM
				[NCCRD].[dbo].[tb_erm_project_details] PD
			INNER JOIN
				[NCCRDv2].[dbo].[Project] P
				ON P.ProjectTitle = PD.ProjectTitle
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_mitigation_details] MD
				ON MD.ProjectDetailsId = PD.ProjectDetailsId

			UNION ALL

			SELECT	
				P.ProjectId,
				(SELECT TOP(1) T.TypologyID FROM [NCCRDv2].[dbo].[Typology] T WHERE T.[Value] = 'Adaptation') AS [TypologyID]
			FROM
				[NCCRD].[dbo].[tb_erm_project_details] PD
			INNER JOIN
				[NCCRDv2].[dbo].[Project] P
				ON P.ProjectTitle = PD.ProjectTitle
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_Project_Adaptation_Data] PAD
				ON PAD.ProjectDetailsId = PD.ProjectDetailsId

			UNION ALL

			SELECT	
				P.ProjectId,
				(SELECT TOP(1) T.TypologyID FROM [NCCRDv2].[dbo].[Typology] T WHERE T.[Value] = 'Research') AS [TypologyId]
			FROM
				[NCCRD].[dbo].[tb_erm_project_details] PD
			INNER JOIN
				[NCCRDv2].[dbo].[Project] P
				ON P.ProjectTitle = PD.ProjectTitle
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_Project_Research_Data] PRD
				ON PRD.ProjectDetailsId = PD.ProjectDetailsId
		) PT

	INSERT INTO
		[NCCRDv2].[dbo].[ProjectTypology]
		(
			ProjectId,
			TypologyID
		)
	SELECT
		P.ProjectId,
		(SELECT T.TypologyID FROM [NCCRDv2].[dbo].[Typology] T WHERE T.[Value] = 'UNDEFINED')
	FROM
		[NCCRDv2].[dbo].[Project] P
	LEFT OUTER JOIN
		[NCCRDv2].[dbo].[ProjectTypology] PT
		ON PT.ProjectId = P.ProjectId
	WHERE
		PT.ProjectId IS NULL
END


--[MITIGATION DETAILS]--
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[MitigationDetails]) = 0
BEGIN
	--[VoluntaryMethodology]--
	INSERT INTO
		[NCCRDv2].[dbo].[VoluntaryMethodology]
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
		[NCCRDv2].[dbo].[MitigationDetails]
		(
			CarbonCreditId,
			CarbonCreditMarketId,
			CDMStatusId,
			CDMMethodologyId,
			VoluntaryMethodologyId,
			OtherDescription,
			CDMProjectNumber,
			ProjectId,
			SectorId
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
		ISNULL(SS.SectorId, MSS.SectorId) AS [SectorId]
	FROM
		[NCCRD].[dbo].[tb_erm_mitigation_details] MD
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = MD.ProjectDetailsId
	INNER JOIN
		[NCCRDv2].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle
	INNER JOIN
		(
			SELECT
				MSS.MainSubSectorId,
				SEC.SectorId
			FROM
				[NCCRD].[dbo].[tb_erm_Mitigation_MainSubSector] MSS
			INNER JOIN
				[NCCRDv2].[dbo].[Sector] SEC
				ON SEC.[Value] = MSS.MainSubSectorType
			INNER JOIN
				[NCCRDv2].[dbo].[SectorType] ST
				ON ST.SectorTypeId = SEC.SectorTypeId
			INNER JOIN
				[NCCRDv2].[dbo].[Typology] T
				ON T.TypologyID = SEC.TypologyID
			WHERE
				ST.[Name] = 'MainSubSector'
			AND
				T.[Value] = 'Mitigation'
		) MSS	
		ON MSS.MainSubSectorId = MD.HostMainSubSector
	LEFT OUTER JOIN
		(
			SELECT
				SS.SubSectorId,
				SEC.SectorId
			FROM
				[NCCRD].[dbo].[tb_erm_Mitigation_SubSector] SS
			INNER JOIN
				[NCCRDv2].[dbo].[Sector] SEC
				ON SEC.[Value] = SS.SubSectorType
			INNER JOIN
				[NCCRDv2].[dbo].[SectorType] ST
				ON ST.SectorTypeId = SEC.SectorTypeId
			INNER JOIN
				[NCCRDv2].[dbo].[Typology] T
				ON T.TypologyID = SEC.TypologyID
			WHERE
				ST.[Name] = 'SubSector'
			AND
				T.[Value] = 'Mitigation'
		) SS	
		ON SS.SubSectorId = MD.HostSubSector
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
				[NCCRDv2].[dbo].[CarbonCredit] CC
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
				[NCCRDv2].[dbo].[CarbonCreditMarket] CCM
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
				[NCCRDv2].[dbo].[CDMStatus] CDM
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
				[NCCRDv2].[dbo].[CDMMethodology] CDM
				ON CDM.Value = PLV.ItemDisplay
			WHERE
				PL.ListName = 'CDM Approved Methodology'
		) CDM2
		ON CDM2.ItemNum = MD.CDMMethodoloy
	LEFT OUTER JOIN
		[NCCRDv2].[dbo].[VoluntaryMethodology] VM
		ON VM.Value = MD.VolMethodoloy
	
	--[MitigationEmissionsData]--
	INSERT INTO
		[NCCRDv2].[dbo].[MitigationEmissionsData]
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
		[NCCRDv2].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle
END


--[ADAPTATION DETAILS]--
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[AdaptationDetails]) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].[dbo].[AdaptationDetails]
		(
			AdaptationPurposeId,
			ProjectId,
			SectorId
		)
	SELECT
		AP.AdaptationPurposeId,
		P.ProjectId,
		SEC.SectorId
	FROM
		[NCCRD].[dbo].[tb_erm_Project_Adaptation_Data] PAD
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = PAD.ProjectDetailsId
	INNER JOIN
		[NCCRDv2].[dbo].[Project] P
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
				[NCCRDv2].[dbo].[AdaptationPurpose] AP
				ON AP.[Value] = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Purpose of adaptation'			
		) AP
		ON AP.ItemNum = PAD.PurposeOfAdaptation
	LEFT OUTER JOIN
		(
			SELECT
				PLV.ItemNum,
				SEC.SectorId
			FROM
				[NCCRD].[dbo].[tb_erm_picklist] PL
			INNER JOIN
				[NCCRD].[dbo].[tb_erm_picklist_value] PLV
				ON PL.ListId = PLV.ListId
			INNER JOIN
				[NCCRDv2].[dbo].[Sector] SEC
				ON SEC.[Value] = PLV.ItemDisplay
			INNER JOIN
				[NCCRDv2].[dbo].[SectorType] ST
				ON ST.SectorTypeId = SEC.SectorTypeId
			INNER JOIN
				[NCCRDv2].[dbo].[Typology] T
				ON T.TypologyID = SEC.TypologyID
			WHERE
				PL.ListName = 'Adaptation Host Sector'	
			AND
				ST.[Name] = 'HostSector'
			AND
				T.[Value] = 'Adaptation'
		) SEC
		ON SEC.ItemNum = PAD.HostSector
END


--[RESEARCH DETAILS]--
IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[ResearchDetails]) = 0
BEGIN
	INSERT INTO
		[NCCRDv2].[dbo].[ResearchDetails]
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
				[NCCRDv2].[dbo].[ResearchType] RT
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
				[NCCRDv2].[dbo].[TargetAudience] TA
				ON TA.Value = PLV.ItemDisplay
			WHERE
				PL.ListName = 'Target audience'			
		) TA
		ON TA.ItemNum = RD.TargetAudience
	INNER JOIN
		[NCCRD].[dbo].[tb_erm_project_details] PD
		ON PD.ProjectDetailsId = RD.ProjectDetailsId
	INNER JOIN
		[NCCRDv2].[dbo].[Project] P
		ON P.ProjectTitle = PD.ProjectTitle
END