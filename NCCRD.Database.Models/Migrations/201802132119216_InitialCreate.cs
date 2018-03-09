namespace NCCRD.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AccessRights",
                c => new
                    {
                        AccessRightId = c.Int(nullable: false, identity: true),
                        AllowRead = c.Boolean(nullable: false),
                        AllowAdd = c.Boolean(nullable: false),
                        AllowUpdate = c.Boolean(nullable: false),
                        AllowDelete = c.Boolean(nullable: false),
                        UserRoleId = c.Int(nullable: false),
                        SitePageId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AccessRightId)
                .ForeignKey("dbo.SitePages", t => t.SitePageId, cascadeDelete: true)
                .ForeignKey("dbo.UserRoles", t => t.UserRoleId, cascadeDelete: true)
                .Index(t => t.UserRoleId)
                .Index(t => t.SitePageId);
            
            CreateTable(
                "dbo.SitePages",
                c => new
                    {
                        SitePageId = c.Int(nullable: false, identity: true),
                        PageTitle = c.String(nullable: false, maxLength: 450),
                        URL = c.String(nullable: false, maxLength: 1000),
                    })
                .PrimaryKey(t => t.SitePageId);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserRoleId = c.Int(nullable: false, identity: true),
                        RoleName = c.String(nullable: false, maxLength: 450),
                    })
                .PrimaryKey(t => t.UserRoleId);
            
            CreateTable(
                "dbo.AdaptationDetails",
                c => new
                    {
                        AdaptationDetailId = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        AdaptationPurposeId = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        SectorId = c.Int(),
                    })
                .PrimaryKey(t => t.AdaptationDetailId)
                .ForeignKey("dbo.AdaptationPurpose", t => t.AdaptationPurposeId, cascadeDelete: true)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.Sector", t => t.SectorId)
                .Index(t => t.AdaptationPurposeId)
                .Index(t => t.ProjectId)
                .Index(t => t.SectorId);
            
            CreateTable(
                "dbo.AdaptationPurpose",
                c => new
                    {
                        AdaptationPurposeId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.AdaptationPurposeId);
            
            CreateTable(
                "dbo.Project",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        ProjectTitle = c.String(nullable: false, maxLength: 450),
                        ProjectDescription = c.String(),
                        LeadAgent = c.String(nullable: false, maxLength: 450),
                        HostPartner = c.String(maxLength: 450),
                        HostOrganisation = c.String(nullable: false, maxLength: 450),
                        StartYear = c.Int(nullable: false),
                        EndYear = c.Int(nullable: false),
                        ReminderSent = c.Boolean(),
                        AlternativeContact = c.String(maxLength: 450),
                        AlternativeContactEmail = c.String(maxLength: 450),
                        Link = c.String(maxLength: 450),
                        ValidationComments = c.String(),
                        BudgetLower = c.Decimal(precision: 18, scale: 2),
                        BudgetUpper = c.Decimal(precision: 18, scale: 2),
                        ProjectTypeId = c.Int(nullable: false),
                        ProjectSubTypeId = c.Int(),
                        ProjectStatusId = c.Int(nullable: false),
                        ProjectManagerId = c.Int(nullable: false),
                        ValidationStatusId = c.Int(),
                        MAOptionId = c.Int(),
                    })
                .PrimaryKey(t => t.ProjectId)
                .ForeignKey("dbo.MAOptions", t => t.MAOptionId)
                .ForeignKey("dbo.Users", t => t.ProjectManagerId, cascadeDelete: true)
                .ForeignKey("dbo.ProjectStatus", t => t.ProjectStatusId, cascadeDelete: true)
                .ForeignKey("dbo.ProjectSubType", t => t.ProjectSubTypeId)
                .ForeignKey("dbo.ProjectType", t => t.ProjectTypeId, cascadeDelete: true)
                .ForeignKey("dbo.ValidationStatus", t => t.ValidationStatusId)
                .Index(t => t.ProjectTitle, unique: true, name: "ProjectTitleIndex")
                .Index(t => t.ProjectTypeId)
                .Index(t => t.ProjectSubTypeId)
                .Index(t => t.ProjectStatusId)
                .Index(t => t.ProjectManagerId)
                .Index(t => t.ValidationStatusId)
                .Index(t => t.MAOptionId);
            
            CreateTable(
                "dbo.MAOptions",
                c => new
                    {
                        MAOptionId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                        FeasibilityId = c.Int(nullable: false),
                        HazardId = c.Int(nullable: false),
                        SectorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MAOptionId)
                .ForeignKey("dbo.Feasibility", t => t.FeasibilityId, cascadeDelete: true)
                .ForeignKey("dbo.Hazards", t => t.HazardId, cascadeDelete: true)
                .ForeignKey("dbo.Sector", t => t.SectorId, cascadeDelete: true)
                .Index(t => t.FeasibilityId)
                .Index(t => t.HazardId)
                .Index(t => t.SectorId);
            
            CreateTable(
                "dbo.Feasibility",
                c => new
                    {
                        FeasibilityId = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.FeasibilityId);
            
            CreateTable(
                "dbo.Hazards",
                c => new
                    {
                        HazardId = c.Int(nullable: false, identity: true),
                        DriverId = c.Int(nullable: false),
                        StockId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.HazardId)
                .ForeignKey("dbo.Drivers", t => t.DriverId, cascadeDelete: true)
                .ForeignKey("dbo.Stocks", t => t.StockId, cascadeDelete: true)
                .Index(t => t.DriverId)
                .Index(t => t.StockId);
            
            CreateTable(
                "dbo.Drivers",
                c => new
                    {
                        DriverId = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.DriverId);
            
            CreateTable(
                "dbo.Stocks",
                c => new
                    {
                        StockId = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.StockId);
            
            CreateTable(
                "dbo.Sector",
                c => new
                    {
                        SectorId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        SectorTypeId = c.Int(nullable: false),
                        ParentSectorID = c.Int(),
                        TypologyId = c.Int(),
                    })
                .PrimaryKey(t => t.SectorId)
                .ForeignKey("dbo.Sector", t => t.ParentSectorID)
                .ForeignKey("dbo.SectorType", t => t.SectorTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Typology", t => t.TypologyId)
                .Index(t => t.SectorTypeId)
                .Index(t => t.ParentSectorID)
                .Index(t => t.TypologyId);
            
            CreateTable(
                "dbo.SectorType",
                c => new
                    {
                        SectorTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 450),
                    })
                .PrimaryKey(t => t.SectorTypeId);
            
            CreateTable(
                "dbo.Typology",
                c => new
                    {
                        TypologyID = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                    })
                .PrimaryKey(t => t.TypologyID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false),
                        Password = c.String(nullable: false, maxLength: 450),
                        Blocked = c.Boolean(),
                        FirstName = c.String(nullable: false, maxLength: 450),
                        Surname = c.String(nullable: false, maxLength: 450),
                        JobTitle = c.String(maxLength: 450),
                        Organisation = c.String(nullable: false, maxLength: 450),
                        PhysicalAddressLine1 = c.String(maxLength: 450),
                        PhysicalAddressLine2 = c.String(maxLength: 450),
                        PhysicalAddressLine3 = c.String(maxLength: 450),
                        PhysicalAddressTown = c.String(maxLength: 450),
                        PhysicalAddressPostalCode = c.String(maxLength: 450),
                        PhysicalAddressProvince = c.String(maxLength: 450),
                        PhysicalAddressCountry = c.String(maxLength: 450),
                        PostalAddressLine1 = c.String(maxLength: 450),
                        PostalAddressLine2 = c.String(maxLength: 450),
                        PostalAddressLine3 = c.String(maxLength: 450),
                        PostalAddressTown = c.String(maxLength: 450),
                        PostalAddressPostalCode = c.String(maxLength: 450),
                        PostalAddressProvince = c.String(maxLength: 450),
                        PostalAddressCountry = c.String(maxLength: 450),
                        PhoneNumber = c.String(maxLength: 450),
                        MobileNumber = c.String(maxLength: 450),
                        FaxNumber = c.String(maxLength: 450),
                        UserRoleId = c.Int(nullable: false),
                        TitleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Title", t => t.TitleId, cascadeDelete: true)
                .ForeignKey("dbo.UserRoles", t => t.UserRoleId, cascadeDelete: true)
                .Index(t => t.UserRoleId)
                .Index(t => t.TitleId);
            
            CreateTable(
                "dbo.Title",
                c => new
                    {
                        TitleId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.TitleId);
            
            CreateTable(
                "dbo.ProjectStatus",
                c => new
                    {
                        ProjectStatusId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ProjectStatusId);
            
            CreateTable(
                "dbo.ProjectSubType",
                c => new
                    {
                        ProjectSubTypeId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                        ProjectTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectSubTypeId)
                .ForeignKey("dbo.ProjectType", t => t.ProjectTypeId, cascadeDelete: true)
                .Index(t => t.ProjectTypeId);
            
            CreateTable(
                "dbo.ProjectType",
                c => new
                    {
                        ProjectTypeId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ProjectTypeId);
            
            CreateTable(
                "dbo.ValidationStatus",
                c => new
                    {
                        ValidationStatusId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ValidationStatusId);
            
            CreateTable(
                "dbo.AppLog",
                c => new
                    {
                        AppLogId = c.Int(nullable: false, identity: true),
                        Message = c.String(nullable: false),
                        MessageDetail = c.String(),
                        LogTime = c.DateTime(nullable: false),
                        ActiveUserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AppLogId)
                .ForeignKey("dbo.Users", t => t.ActiveUserId, cascadeDelete: true)
                .Index(t => t.ActiveUserId);
            
            CreateTable(
                "dbo.CarbonCredit",
                c => new
                    {
                        CarbonCreditId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.CarbonCreditId);
            
            CreateTable(
                "dbo.CarbonCreditMarket",
                c => new
                    {
                        CarbonCreditMarketId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.CarbonCreditMarketId);
            
            CreateTable(
                "dbo.CDMMethodology",
                c => new
                    {
                        CDMMethodologyId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.CDMMethodologyId);
            
            CreateTable(
                "dbo.CDMStatus",
                c => new
                    {
                        CDMStatusId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.CDMStatusId);
            
            CreateTable(
                "dbo.ChangeLog",
                c => new
                    {
                        ChangeLogId = c.Int(nullable: false, identity: true),
                        EntityName = c.String(nullable: false, maxLength: 450),
                        ChangeType = c.String(nullable: false, maxLength: 450),
                        PrimaryKeyValue = c.String(),
                        PropertyName = c.String(nullable: false, maxLength: 450),
                        OldValue = c.String(),
                        NewValue = c.String(),
                        DateChanged = c.DateTime(nullable: false),
                        ActiveUserId = c.Int(),
                    })
                .PrimaryKey(t => t.ChangeLogId)
                .ForeignKey("dbo.Users", t => t.ActiveUserId)
                .Index(t => t.ActiveUserId);
            
            CreateTable(
                "dbo.Country",
                c => new
                    {
                        CountryId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.CountryId);
            
            CreateTable(
                "dbo.Funders",
                c => new
                    {
                        FunderId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.FunderId);
            
            CreateTable(
                "dbo.FundingStatus",
                c => new
                    {
                        FundingStatusId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.FundingStatusId);
            
            CreateTable(
                "dbo.Location",
                c => new
                    {
                        LocationId = c.Int(nullable: false, identity: true),
                        LatDegree = c.Double(),
                        LatMinutes = c.Double(),
                        LatSeconds = c.Double(),
                        LatDirection = c.Double(),
                        LatCalculated = c.Double(),
                        LonDegree = c.Double(),
                        LonMinutes = c.Double(),
                        LonSeconds = c.Double(),
                        LonDirection = c.Double(),
                        LonCalculated = c.Double(),
                    })
                .PrimaryKey(t => t.LocationId);
            
            CreateTable(
                "dbo.LocationType",
                c => new
                    {
                        LocationTypeId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                    })
                .PrimaryKey(t => t.LocationTypeId);
            
            CreateTable(
                "dbo.MitigationDetails",
                c => new
                    {
                        MitigationDetailId = c.Int(nullable: false, identity: true),
                        VCS = c.Int(),
                        Other = c.Int(),
                        OtherDescription = c.String(),
                        CDMProjectNumber = c.String(maxLength: 450),
                        CarbonCreditId = c.Int(nullable: false),
                        CarbonCreditMarketId = c.Int(),
                        CDMStatusId = c.Int(),
                        CDMMethodologyId = c.Int(),
                        VoluntaryMethodologyId = c.Int(),
                        VoluntaryGoldStandardId = c.Int(),
                        ProjectId = c.Int(nullable: false),
                        SectorId = c.Int(),
                    })
                .PrimaryKey(t => t.MitigationDetailId)
                .ForeignKey("dbo.CarbonCredit", t => t.CarbonCreditId, cascadeDelete: true)
                .ForeignKey("dbo.CarbonCreditMarket", t => t.CarbonCreditMarketId)
                .ForeignKey("dbo.CDMMethodology", t => t.CDMMethodologyId)
                .ForeignKey("dbo.CDMStatus", t => t.CDMStatusId)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.Sector", t => t.SectorId)
                .ForeignKey("dbo.VoluntaryGoldStandard", t => t.VoluntaryGoldStandardId)
                .ForeignKey("dbo.VoluntaryMethodology", t => t.VoluntaryMethodologyId)
                .Index(t => t.CarbonCreditId)
                .Index(t => t.CarbonCreditMarketId)
                .Index(t => t.CDMStatusId)
                .Index(t => t.CDMMethodologyId)
                .Index(t => t.VoluntaryMethodologyId)
                .Index(t => t.VoluntaryGoldStandardId)
                .Index(t => t.ProjectId)
                .Index(t => t.SectorId);
            
            CreateTable(
                "dbo.VoluntaryGoldStandard",
                c => new
                    {
                        VoluntaryGoldStandardId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.VoluntaryGoldStandardId);
            
            CreateTable(
                "dbo.VoluntaryMethodology",
                c => new
                    {
                        VoluntaryMethodologyId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.VoluntaryMethodologyId);
            
            CreateTable(
                "dbo.MitigationEmissionsData",
                c => new
                    {
                        MitigationEmissionsDataId = c.Int(nullable: false, identity: true),
                        Year = c.Int(nullable: false),
                        CO2 = c.Double(),
                        CH4 = c.Double(),
                        CH4_CO2e = c.Double(),
                        N2O = c.Double(),
                        N2O_CO2e = c.Double(),
                        HFC = c.Double(),
                        HFC_CO2e = c.Double(),
                        PFC = c.Double(),
                        PFC_CO2e = c.Double(),
                        SF6 = c.Double(),
                        SF6_CO2e = c.Double(),
                        Hydro = c.Double(),
                        Hydro_CO2e = c.Double(),
                        Tidal = c.Double(),
                        Tidal_CO2e = c.Double(),
                        Wind = c.Double(),
                        Wind_CO2e = c.Double(),
                        Solar = c.Double(),
                        Solar_CO2e = c.Double(),
                        FossilFuelElecRed = c.Double(),
                        FossilFuelElecRed_CO2e = c.Double(),
                        BioWaste = c.Double(),
                        BioWaste_CO2e = c.Double(),
                        Geothermal = c.Double(),
                        Geothermal_CO2e = c.Double(),
                        ProjectId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MitigationEmissionsDataId)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.OptionFunder",
                c => new
                    {
                        OptionFunderId = c.Int(nullable: false, identity: true),
                        FunderId = c.Int(nullable: false),
                        MAOptionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.OptionFunderId)
                .ForeignKey("dbo.Funders", t => t.FunderId, cascadeDelete: true)
                .ForeignKey("dbo.MAOptions", t => t.MAOptionId, cascadeDelete: true)
                .Index(t => t.FunderId)
                .Index(t => t.MAOptionId);
            
            CreateTable(
                "dbo.OptionRegion",
                c => new
                    {
                        OptionRegionId = c.Int(nullable: false, identity: true),
                        RegionId = c.Int(nullable: false),
                        MAOptionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.OptionRegionId)
                .ForeignKey("dbo.MAOptions", t => t.MAOptionId, cascadeDelete: true)
                .ForeignKey("dbo.Region", t => t.RegionId, cascadeDelete: true)
                .Index(t => t.RegionId)
                .Index(t => t.MAOptionId);
            
            CreateTable(
                "dbo.Region",
                c => new
                    {
                        RegionId = c.Int(nullable: false, identity: true),
                        RegionName = c.String(nullable: false, maxLength: 450),
                        RegionDesription = c.String(),
                        LocationTypeId = c.Int(nullable: false),
                        ParentRegionID = c.Int(),
                    })
                .PrimaryKey(t => t.RegionId)
                .ForeignKey("dbo.LocationType", t => t.LocationTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Region", t => t.ParentRegionID)
                .Index(t => t.LocationTypeId)
                .Index(t => t.ParentRegionID);
            
            CreateTable(
                "dbo.ProjectFunder",
                c => new
                    {
                        ProjectFunderId = c.Int(nullable: false, identity: true),
                        FunderId = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        FundingStatusId = c.Int(),
                    })
                .PrimaryKey(t => t.ProjectFunderId)
                .ForeignKey("dbo.Funders", t => t.FunderId, cascadeDelete: true)
                .ForeignKey("dbo.FundingStatus", t => t.FundingStatusId)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.FunderId)
                .Index(t => t.ProjectId)
                .Index(t => t.FundingStatusId);
            
            CreateTable(
                "dbo.ProjectLocation",
                c => new
                    {
                        ProjectLocationId = c.Int(nullable: false, identity: true),
                        ProjectId = c.Int(nullable: false),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectLocationId)
                .ForeignKey("dbo.Location", t => t.LocationId, cascadeDelete: true)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.LocationId);
            
            CreateTable(
                "dbo.ProjectRegion",
                c => new
                    {
                        ProjectRegionId = c.Int(nullable: false, identity: true),
                        ProjectId = c.Int(nullable: false),
                        RegionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectRegionId)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.Region", t => t.RegionId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.RegionId);
            
            CreateTable(
                "dbo.ResearchDetails",
                c => new
                    {
                        ResearchDetailId = c.Int(nullable: false, identity: true),
                        Author = c.String(nullable: false, maxLength: 450),
                        PaperLink = c.String(maxLength: 450),
                        ResearchTypeId = c.Int(nullable: false),
                        TargetAudienceId = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        SectorId = c.Int(),
                    })
                .PrimaryKey(t => t.ResearchDetailId)
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.ResearchType", t => t.ResearchTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Sector", t => t.SectorId)
                .ForeignKey("dbo.TargetAudience", t => t.TargetAudienceId, cascadeDelete: true)
                .Index(t => t.ResearchTypeId)
                .Index(t => t.TargetAudienceId)
                .Index(t => t.ProjectId)
                .Index(t => t.SectorId);
            
            CreateTable(
                "dbo.ResearchType",
                c => new
                    {
                        ResearchTypeId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ResearchTypeId);
            
            CreateTable(
                "dbo.TargetAudience",
                c => new
                    {
                        TargetAudienceId = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 450),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.TargetAudienceId);
            
            CreateTable(
                "dbo.VersionHistory",
                c => new
                    {
                        VersionHistoryId = c.Int(nullable: false, identity: true),
                        VersionNumber = c.String(nullable: false, maxLength: 450),
                        UpdateTime = c.DateTime(nullable: false),
                        Comments = c.String(),
                    })
                .PrimaryKey(t => t.VersionHistoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ResearchDetails", "TargetAudienceId", "dbo.TargetAudience");
            DropForeignKey("dbo.ResearchDetails", "SectorId", "dbo.Sector");
            DropForeignKey("dbo.ResearchDetails", "ResearchTypeId", "dbo.ResearchType");
            DropForeignKey("dbo.ResearchDetails", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.ProjectRegion", "RegionId", "dbo.Region");
            DropForeignKey("dbo.ProjectRegion", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.ProjectLocation", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.ProjectLocation", "LocationId", "dbo.Location");
            DropForeignKey("dbo.ProjectFunder", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.ProjectFunder", "FundingStatusId", "dbo.FundingStatus");
            DropForeignKey("dbo.ProjectFunder", "FunderId", "dbo.Funders");
            DropForeignKey("dbo.OptionRegion", "RegionId", "dbo.Region");
            DropForeignKey("dbo.Region", "ParentRegionID", "dbo.Region");
            DropForeignKey("dbo.Region", "LocationTypeId", "dbo.LocationType");
            DropForeignKey("dbo.OptionRegion", "MAOptionId", "dbo.MAOptions");
            DropForeignKey("dbo.OptionFunder", "MAOptionId", "dbo.MAOptions");
            DropForeignKey("dbo.OptionFunder", "FunderId", "dbo.Funders");
            DropForeignKey("dbo.MitigationEmissionsData", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.MitigationDetails", "VoluntaryMethodologyId", "dbo.VoluntaryMethodology");
            DropForeignKey("dbo.MitigationDetails", "VoluntaryGoldStandardId", "dbo.VoluntaryGoldStandard");
            DropForeignKey("dbo.MitigationDetails", "SectorId", "dbo.Sector");
            DropForeignKey("dbo.MitigationDetails", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.MitigationDetails", "CDMStatusId", "dbo.CDMStatus");
            DropForeignKey("dbo.MitigationDetails", "CDMMethodologyId", "dbo.CDMMethodology");
            DropForeignKey("dbo.MitigationDetails", "CarbonCreditMarketId", "dbo.CarbonCreditMarket");
            DropForeignKey("dbo.MitigationDetails", "CarbonCreditId", "dbo.CarbonCredit");
            DropForeignKey("dbo.ChangeLog", "ActiveUserId", "dbo.Users");
            DropForeignKey("dbo.AppLog", "ActiveUserId", "dbo.Users");
            DropForeignKey("dbo.AdaptationDetails", "SectorId", "dbo.Sector");
            DropForeignKey("dbo.AdaptationDetails", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.Project", "ValidationStatusId", "dbo.ValidationStatus");
            DropForeignKey("dbo.Project", "ProjectTypeId", "dbo.ProjectType");
            DropForeignKey("dbo.Project", "ProjectSubTypeId", "dbo.ProjectSubType");
            DropForeignKey("dbo.ProjectSubType", "ProjectTypeId", "dbo.ProjectType");
            DropForeignKey("dbo.Project", "ProjectStatusId", "dbo.ProjectStatus");
            DropForeignKey("dbo.Project", "ProjectManagerId", "dbo.Users");
            DropForeignKey("dbo.Users", "UserRoleId", "dbo.UserRoles");
            DropForeignKey("dbo.Users", "TitleId", "dbo.Title");
            DropForeignKey("dbo.Project", "MAOptionId", "dbo.MAOptions");
            DropForeignKey("dbo.MAOptions", "SectorId", "dbo.Sector");
            DropForeignKey("dbo.Sector", "TypologyId", "dbo.Typology");
            DropForeignKey("dbo.Sector", "SectorTypeId", "dbo.SectorType");
            DropForeignKey("dbo.Sector", "ParentSectorID", "dbo.Sector");
            DropForeignKey("dbo.MAOptions", "HazardId", "dbo.Hazards");
            DropForeignKey("dbo.Hazards", "StockId", "dbo.Stocks");
            DropForeignKey("dbo.Hazards", "DriverId", "dbo.Drivers");
            DropForeignKey("dbo.MAOptions", "FeasibilityId", "dbo.Feasibility");
            DropForeignKey("dbo.AdaptationDetails", "AdaptationPurposeId", "dbo.AdaptationPurpose");
            DropForeignKey("dbo.AccessRights", "UserRoleId", "dbo.UserRoles");
            DropForeignKey("dbo.AccessRights", "SitePageId", "dbo.SitePages");
            DropIndex("dbo.ResearchDetails", new[] { "SectorId" });
            DropIndex("dbo.ResearchDetails", new[] { "ProjectId" });
            DropIndex("dbo.ResearchDetails", new[] { "TargetAudienceId" });
            DropIndex("dbo.ResearchDetails", new[] { "ResearchTypeId" });
            DropIndex("dbo.ProjectRegion", new[] { "RegionId" });
            DropIndex("dbo.ProjectRegion", new[] { "ProjectId" });
            DropIndex("dbo.ProjectLocation", new[] { "LocationId" });
            DropIndex("dbo.ProjectLocation", new[] { "ProjectId" });
            DropIndex("dbo.ProjectFunder", new[] { "FundingStatusId" });
            DropIndex("dbo.ProjectFunder", new[] { "ProjectId" });
            DropIndex("dbo.ProjectFunder", new[] { "FunderId" });
            DropIndex("dbo.Region", new[] { "ParentRegionID" });
            DropIndex("dbo.Region", new[] { "LocationTypeId" });
            DropIndex("dbo.OptionRegion", new[] { "MAOptionId" });
            DropIndex("dbo.OptionRegion", new[] { "RegionId" });
            DropIndex("dbo.OptionFunder", new[] { "MAOptionId" });
            DropIndex("dbo.OptionFunder", new[] { "FunderId" });
            DropIndex("dbo.MitigationEmissionsData", new[] { "ProjectId" });
            DropIndex("dbo.MitigationDetails", new[] { "SectorId" });
            DropIndex("dbo.MitigationDetails", new[] { "ProjectId" });
            DropIndex("dbo.MitigationDetails", new[] { "VoluntaryGoldStandardId" });
            DropIndex("dbo.MitigationDetails", new[] { "VoluntaryMethodologyId" });
            DropIndex("dbo.MitigationDetails", new[] { "CDMMethodologyId" });
            DropIndex("dbo.MitigationDetails", new[] { "CDMStatusId" });
            DropIndex("dbo.MitigationDetails", new[] { "CarbonCreditMarketId" });
            DropIndex("dbo.MitigationDetails", new[] { "CarbonCreditId" });
            DropIndex("dbo.ChangeLog", new[] { "ActiveUserId" });
            DropIndex("dbo.AppLog", new[] { "ActiveUserId" });
            DropIndex("dbo.ProjectSubType", new[] { "ProjectTypeId" });
            DropIndex("dbo.Users", new[] { "TitleId" });
            DropIndex("dbo.Users", new[] { "UserRoleId" });
            DropIndex("dbo.Sector", new[] { "TypologyId" });
            DropIndex("dbo.Sector", new[] { "ParentSectorID" });
            DropIndex("dbo.Sector", new[] { "SectorTypeId" });
            DropIndex("dbo.Hazards", new[] { "StockId" });
            DropIndex("dbo.Hazards", new[] { "DriverId" });
            DropIndex("dbo.MAOptions", new[] { "SectorId" });
            DropIndex("dbo.MAOptions", new[] { "HazardId" });
            DropIndex("dbo.MAOptions", new[] { "FeasibilityId" });
            DropIndex("dbo.Project", new[] { "MAOptionId" });
            DropIndex("dbo.Project", new[] { "ValidationStatusId" });
            DropIndex("dbo.Project", new[] { "ProjectManagerId" });
            DropIndex("dbo.Project", new[] { "ProjectStatusId" });
            DropIndex("dbo.Project", new[] { "ProjectSubTypeId" });
            DropIndex("dbo.Project", new[] { "ProjectTypeId" });
            DropIndex("dbo.Project", "ProjectTitleIndex");
            DropIndex("dbo.AdaptationDetails", new[] { "SectorId" });
            DropIndex("dbo.AdaptationDetails", new[] { "ProjectId" });
            DropIndex("dbo.AdaptationDetails", new[] { "AdaptationPurposeId" });
            DropIndex("dbo.AccessRights", new[] { "SitePageId" });
            DropIndex("dbo.AccessRights", new[] { "UserRoleId" });
            DropTable("dbo.VersionHistory");
            DropTable("dbo.TargetAudience");
            DropTable("dbo.ResearchType");
            DropTable("dbo.ResearchDetails");
            DropTable("dbo.ProjectRegion");
            DropTable("dbo.ProjectLocation");
            DropTable("dbo.ProjectFunder");
            DropTable("dbo.Region");
            DropTable("dbo.OptionRegion");
            DropTable("dbo.OptionFunder");
            DropTable("dbo.MitigationEmissionsData");
            DropTable("dbo.VoluntaryMethodology");
            DropTable("dbo.VoluntaryGoldStandard");
            DropTable("dbo.MitigationDetails");
            DropTable("dbo.LocationType");
            DropTable("dbo.Location");
            DropTable("dbo.FundingStatus");
            DropTable("dbo.Funders");
            DropTable("dbo.Country");
            DropTable("dbo.ChangeLog");
            DropTable("dbo.CDMStatus");
            DropTable("dbo.CDMMethodology");
            DropTable("dbo.CarbonCreditMarket");
            DropTable("dbo.CarbonCredit");
            DropTable("dbo.AppLog");
            DropTable("dbo.ValidationStatus");
            DropTable("dbo.ProjectType");
            DropTable("dbo.ProjectSubType");
            DropTable("dbo.ProjectStatus");
            DropTable("dbo.Title");
            DropTable("dbo.Users");
            DropTable("dbo.Typology");
            DropTable("dbo.SectorType");
            DropTable("dbo.Sector");
            DropTable("dbo.Stocks");
            DropTable("dbo.Drivers");
            DropTable("dbo.Hazards");
            DropTable("dbo.Feasibility");
            DropTable("dbo.MAOptions");
            DropTable("dbo.Project");
            DropTable("dbo.AdaptationPurpose");
            DropTable("dbo.AdaptationDetails");
            DropTable("dbo.UserRoles");
            DropTable("dbo.SitePages");
            DropTable("dbo.AccessRights");
        }
    }
}
