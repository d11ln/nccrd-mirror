﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NCCRD.Services.DataV2.Database.Contexts;

namespace NCCRD.Services.DataV2.Migrations
{
    [DbContext(typeof(SQLDBContext))]
    partial class SQLDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.AdaptationDetail", b =>
                {
                    b.Property<int>("AdaptationDetailId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdaptationPurposeId");

                    b.Property<string>("Description");

                    b.Property<int?>("HazardId");

                    b.Property<int>("ProjectId");

                    b.Property<int>("ProjectStatusId");

                    b.Property<int?>("SectorId");

                    b.HasKey("AdaptationDetailId");

                    b.HasIndex("AdaptationPurposeId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ProjectStatusId");

                    b.HasIndex("SectorId");

                    b.ToTable("AdaptationDetails");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.AdaptationPurpose", b =>
                {
                    b.Property<int>("AdaptationPurposeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("AdaptationPurposeId");

                    b.ToTable("AdaptationPurpose");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.CarbonCredit", b =>
                {
                    b.Property<int>("CarbonCreditId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("CarbonCreditId");

                    b.ToTable("CarbonCredit");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.CarbonCreditMarket", b =>
                {
                    b.Property<int>("CarbonCreditMarketId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("CarbonCreditMarketId");

                    b.ToTable("CarbonCreditMarket");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.CDMMethodology", b =>
                {
                    b.Property<int>("CDMMethodologyId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("CDMMethodologyId");

                    b.ToTable("CDMMethodology");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.CDMStatus", b =>
                {
                    b.Property<int>("CDMStatusId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("CDMStatusId");

                    b.ToTable("CDMStatus");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Funder", b =>
                {
                    b.Property<int>("FunderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("AnnualBudget");

                    b.Property<string>("FundingAgency")
                        .IsRequired();

                    b.Property<int?>("FundingStatusId");

                    b.Property<string>("GrantProgName");

                    b.Property<string>("PartnerDepsOrgs");

                    b.Property<int?>("ProjectCoordinatorId");

                    b.Property<decimal?>("TotalBudget");

                    b.HasKey("FunderId");

                    b.HasIndex("FundingStatusId");

                    b.HasIndex("ProjectCoordinatorId");

                    b.ToTable("Funders");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.FundingStatus", b =>
                {
                    b.Property<int>("FundingStatusId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("FundingStatusId");

                    b.ToTable("FundingStatus");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Location", b =>
                {
                    b.Property<int>("LocationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("LatCalculated");

                    b.Property<double?>("LatDegree");

                    b.Property<double?>("LatDirection");

                    b.Property<double?>("LatMinutes");

                    b.Property<double?>("LatSeconds");

                    b.Property<double?>("LonCalculated");

                    b.Property<double?>("LonDegree");

                    b.Property<double?>("LonDirection");

                    b.Property<double?>("LonMinutes");

                    b.Property<double?>("LonSeconds");

                    b.HasKey("LocationId");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.LocationType", b =>
                {
                    b.Property<int>("LocationTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("LocationTypeId");

                    b.ToTable("LocationType");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.MitigationDetail", b =>
                {
                    b.Property<int>("MitigationDetailId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CDMMethodologyId");

                    b.Property<string>("CDMProjectNumber")
                        .HasMaxLength(450);

                    b.Property<int?>("CDMStatusId");

                    b.Property<int>("CarbonCreditId");

                    b.Property<int?>("CarbonCreditMarketId");

                    b.Property<int?>("Other");

                    b.Property<string>("OtherDescription");

                    b.Property<int>("ProjectId");

                    b.Property<int>("ProjectStatusId");

                    b.Property<int?>("SectorId");

                    b.Property<int?>("VCS");

                    b.Property<int?>("VoluntaryGoldStandardId");

                    b.Property<int?>("VoluntaryMethodologyId");

                    b.HasKey("MitigationDetailId");

                    b.HasIndex("CDMMethodologyId");

                    b.HasIndex("CDMStatusId");

                    b.HasIndex("CarbonCreditId");

                    b.HasIndex("CarbonCreditMarketId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ProjectStatusId");

                    b.HasIndex("SectorId");

                    b.HasIndex("VoluntaryGoldStandardId");

                    b.HasIndex("VoluntaryMethodologyId");

                    b.ToTable("MitigationDetails");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.MitigationEmissionsData", b =>
                {
                    b.Property<int>("MitigationEmissionsDataId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("BioWaste");

                    b.Property<double?>("BioWaste_CO2e");

                    b.Property<double?>("CH4");

                    b.Property<double?>("CH4_CO2e");

                    b.Property<double?>("CO2");

                    b.Property<double?>("FossilFuelElecRed");

                    b.Property<double?>("FossilFuelElecRed_CO2e");

                    b.Property<double?>("Geothermal");

                    b.Property<double?>("Geothermal_CO2e");

                    b.Property<double?>("HFC");

                    b.Property<double?>("HFC_CO2e");

                    b.Property<double?>("Hydro");

                    b.Property<double?>("Hydro_CO2e");

                    b.Property<double?>("N2O");

                    b.Property<double?>("N2O_CO2e");

                    b.Property<double?>("PFC");

                    b.Property<double?>("PFC_CO2e");

                    b.Property<int>("ProjectId");

                    b.Property<double?>("SF6");

                    b.Property<double?>("SF6_CO2e");

                    b.Property<double?>("Solar");

                    b.Property<double?>("Solar_CO2e");

                    b.Property<double?>("Tidal");

                    b.Property<double?>("Tidal_CO2e");

                    b.Property<double?>("Wind");

                    b.Property<double?>("Wind_CO2e");

                    b.Property<int>("Year");

                    b.HasKey("MitigationEmissionsDataId");

                    b.HasIndex("ProjectId");

                    b.ToTable("MitigationEmissionsData");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Person", b =>
                {
                    b.Property<int>("PersonId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AddressLine1");

                    b.Property<string>("AddressLine2");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("MobileNumber")
                        .HasMaxLength(450);

                    b.Property<string>("Organisation")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(450);

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("PersonId");

                    b.ToTable("Person");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AlternativeContact")
                        .HasMaxLength(450);

                    b.Property<string>("AlternativeContactEmail")
                        .HasMaxLength(450);

                    b.Property<decimal?>("BudgetLower");

                    b.Property<decimal?>("BudgetUpper");

                    b.Property<int>("EndYear");

                    b.Property<string>("HostOrganisation")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("HostPartner")
                        .HasMaxLength(450);

                    b.Property<string>("LeadAgent")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("Link")
                        .HasMaxLength(450);

                    b.Property<Guid?>("LinkedDAOGoalId");

                    b.Property<string>("ProjectDescription");

                    b.Property<int>("ProjectManagerId");

                    b.Property<int?>("ProjectSubTypeId");

                    b.Property<string>("ProjectTitle")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<int>("ProjectTypeId");

                    b.Property<bool?>("ReminderSent");

                    b.Property<int>("StartYear");

                    b.Property<string>("ValidationComments");

                    b.Property<int?>("ValidationStatusId");

                    b.HasKey("ProjectId");

                    b.HasIndex("ProjectManagerId");

                    b.HasIndex("ProjectSubTypeId");

                    b.HasIndex("ProjectTypeId");

                    b.HasIndex("ValidationStatusId");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectFunder", b =>
                {
                    b.Property<int>("ProjectFunderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FunderId");

                    b.Property<int>("ProjectId");

                    b.HasKey("ProjectFunderId");

                    b.HasIndex("FunderId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectFunder");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectLocation", b =>
                {
                    b.Property<int>("ProjectLocationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LocationId");

                    b.Property<int>("ProjectId");

                    b.HasKey("ProjectLocationId");

                    b.HasIndex("LocationId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectLocation");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectRegion", b =>
                {
                    b.Property<int>("ProjectRegionId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ProjectId");

                    b.Property<int>("RegionId");

                    b.HasKey("ProjectRegionId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("RegionId");

                    b.ToTable("ProjectRegion");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectStatus", b =>
                {
                    b.Property<int>("ProjectStatusId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ProjectStatusId");

                    b.ToTable("ProjectStatus");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectSubType", b =>
                {
                    b.Property<int>("ProjectSubTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<int>("ProjectTypeId");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ProjectSubTypeId");

                    b.HasIndex("ProjectTypeId");

                    b.ToTable("ProjectSubType");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectType", b =>
                {
                    b.Property<int>("ProjectTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ProjectTypeId");

                    b.ToTable("ProjectType");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Region", b =>
                {
                    b.Property<int>("RegionId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LocationTypeId");

                    b.Property<int?>("ParentRegionId");

                    b.Property<string>("RegionDesription");

                    b.Property<string>("RegionName")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("RegionId");

                    b.HasIndex("LocationTypeId");

                    b.HasIndex("ParentRegionId");

                    b.ToTable("Region");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ResearchDetail", b =>
                {
                    b.Property<int>("ResearchDetailId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("PaperLink")
                        .HasMaxLength(450);

                    b.Property<int>("ProjectId");

                    b.Property<int>("ResearchTypeId");

                    b.Property<int?>("SectorId");

                    b.Property<int>("TargetAudienceId");

                    b.HasKey("ResearchDetailId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ResearchTypeId");

                    b.HasIndex("SectorId");

                    b.HasIndex("TargetAudienceId");

                    b.ToTable("ResearchDetails");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ResearchType", b =>
                {
                    b.Property<int>("ResearchTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ResearchTypeId");

                    b.ToTable("ResearchType");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Sector", b =>
                {
                    b.Property<int>("SectorId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ParentSectorId");

                    b.Property<int>("SectorTypeId");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("SectorId");

                    b.HasIndex("ParentSectorId");

                    b.HasIndex("SectorTypeId");

                    b.ToTable("Sector");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.SectorType", b =>
                {
                    b.Property<int>("SectorTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("SectorTypeId");

                    b.ToTable("SectorType");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.TargetAudience", b =>
                {
                    b.Property<int>("TargetAudienceId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("TargetAudienceId");

                    b.ToTable("TargetAudience");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Typology", b =>
                {
                    b.Property<int>("TypologyId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("TypologyId");

                    b.ToTable("Typology");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ValidationStatus", b =>
                {
                    b.Property<int>("ValidationStatusId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ValidationStatusId");

                    b.ToTable("ValidationStatus");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.VersionHistory", b =>
                {
                    b.Property<int>("VersionHistoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comments");

                    b.Property<DateTime>("UpdateTime");

                    b.Property<string>("VersionNumber")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("VersionHistoryId");

                    b.ToTable("VersionHistory");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.VoluntaryGoldStandard", b =>
                {
                    b.Property<int>("VoluntaryGoldStandardId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("VoluntaryGoldStandardId");

                    b.ToTable("VoluntaryGoldStandard");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.VoluntaryMethodology", b =>
                {
                    b.Property<int>("VoluntaryMethodologyId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("VoluntaryMethodologyId");

                    b.ToTable("VoluntaryMethodology");
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.AdaptationDetail", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.AdaptationPurpose", "AdaptationPurpose")
                        .WithMany()
                        .HasForeignKey("AdaptationPurposeId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany("AdaptationDetails")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ProjectStatus", "ProjectStatus")
                        .WithMany("AdaptationDetails")
                        .HasForeignKey("ProjectStatusId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Sector", "Sector")
                        .WithMany()
                        .HasForeignKey("SectorId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Funder", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.FundingStatus", "FundingStatus")
                        .WithMany()
                        .HasForeignKey("FundingStatusId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Person", "ProjectCoordinator")
                        .WithMany()
                        .HasForeignKey("ProjectCoordinatorId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.MitigationDetail", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.CDMMethodology", "CDMMethodology")
                        .WithMany()
                        .HasForeignKey("CDMMethodologyId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.CDMStatus", "CDMStatus")
                        .WithMany()
                        .HasForeignKey("CDMStatusId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.CarbonCredit", "CarbonCredit")
                        .WithMany()
                        .HasForeignKey("CarbonCreditId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.CarbonCreditMarket", "CarbonCreditMarket")
                        .WithMany()
                        .HasForeignKey("CarbonCreditMarketId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany("MitigationDetails")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ProjectStatus", "ProjectStatus")
                        .WithMany("MitigationDetails")
                        .HasForeignKey("ProjectStatusId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Sector", "Sector")
                        .WithMany()
                        .HasForeignKey("SectorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.VoluntaryGoldStandard", "VoluntaryGoldStandard")
                        .WithMany()
                        .HasForeignKey("VoluntaryGoldStandardId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.VoluntaryMethodology", "VoluntaryMethodology")
                        .WithMany()
                        .HasForeignKey("VoluntaryMethodologyId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.MitigationEmissionsData", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Project", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Person", "ProjectManager")
                        .WithMany()
                        .HasForeignKey("ProjectManagerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ProjectSubType", "ProjectSubType")
                        .WithMany()
                        .HasForeignKey("ProjectSubTypeId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ProjectType", "ProjectType")
                        .WithMany()
                        .HasForeignKey("ProjectTypeId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ValidationStatus", "ValidationStatus")
                        .WithMany()
                        .HasForeignKey("ValidationStatusId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectFunder", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Funder", "Funder")
                        .WithMany()
                        .HasForeignKey("FunderId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany("ProjectFunders")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectLocation", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany("ProjectLocations")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectRegion", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany("ProjectRegions")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Region", "Region")
                        .WithMany()
                        .HasForeignKey("RegionId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ProjectSubType", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ProjectType", "ProjectType")
                        .WithMany()
                        .HasForeignKey("ProjectTypeId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Region", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.LocationType", "LocationType")
                        .WithMany()
                        .HasForeignKey("LocationTypeId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Region", "ParentRegion")
                        .WithMany()
                        .HasForeignKey("ParentRegionId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.ResearchDetail", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Project", "Project")
                        .WithMany("ResearchDetails")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.ResearchType", "ResearchType")
                        .WithMany()
                        .HasForeignKey("ResearchTypeId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Sector", "Sector")
                        .WithMany()
                        .HasForeignKey("SectorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.TargetAudience", "TargetAudience")
                        .WithMany()
                        .HasForeignKey("TargetAudienceId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("NCCRD.Services.DataV2.Database.Models.Sector", b =>
                {
                    b.HasOne("NCCRD.Services.DataV2.Database.Models.Sector", "ParentSector")
                        .WithMany()
                        .HasForeignKey("ParentSectorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("NCCRD.Services.DataV2.Database.Models.SectorType", "SectorType")
                        .WithMany()
                        .HasForeignKey("SectorTypeId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
