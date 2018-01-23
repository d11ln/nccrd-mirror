-- ## (4) NCCRD Data Migration Script - Region Data ## --
USE Master

IF (SELECT COUNT(*) FROM [NCCRDv2].[dbo].[Region]) = 0
BEGIN
	--Province--
	INSERT INTO
		[NCCRDv2].[dbo].[Region]
		(
			RegionName,
			LocationType_LocationTypeId
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
			LocationType_LocationTypeId,
			ParentRegion_RegionId
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
		AND REG.LocationType_LocationTypeId = (SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'Province')

	--LocalMunicipality--
	INSERT INTO
		[NCCRDv2].[dbo].[Region]
		(
			RegionName,
			LocationType_LocationTypeId,
			ParentRegion_RegionId
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
		AND REG.LocationType_LocationTypeId = (SELECT LocationTypeId FROM [NCCRDv2].[dbo].LocationType WHERE [Value] = 'DistrictMunicipality')
END


SELECT
	R.*,
	LT.[Value] AS [LocationType],
	PR.RegionName
FROM
	[NCCRDv2].[dbo].[Region] R
INNER JOIN
	[NCCRDv2].[dbo].LocationType LT
	ON R.LocationType_LocationTypeId = LT.LocationTypeId
LEFT OUTER JOIN
	[NCCRDv2].[dbo].[Region] PR
	ON PR.RegionId = R.ParentRegion_RegionId