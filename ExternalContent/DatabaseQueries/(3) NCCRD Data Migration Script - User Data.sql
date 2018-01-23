-- ## (3) NCCRD Data Migration Script - User Data ## --
USE master

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
        ,[Title_TitleId]
        ,[UserRole_UserRoleId]
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


SELECT * FROM [NCCRDv2].[dbo].[UserRoles]

SELECT
	UR.RoleName,
	T.[Value],
	USR.*
FROM
	[NCCRDv2].[dbo].[Users] USR
INNER JOIN
	[NCCRDv2].[dbo].Title T
	ON T.TitleId = USR.Title_TitleId
INNER JOIN
	[NCCRDv2].[dbo].UserRoles UR
	ON UR.UserRoleId = USR.UserRole_UserRoleId


