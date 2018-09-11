using Microsoft.EntityFrameworkCore.Migrations;

namespace NCCRD.Services.DataV2.Migrations
{
    public partial class RemovedTypologyfromSector : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sector_Typology_TypologyId",
                table: "Sector");

            migrationBuilder.DropIndex(
                name: "IX_Sector_TypologyId",
                table: "Sector");

            migrationBuilder.DropColumn(
                name: "TypologyId",
                table: "Sector");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypologyId",
                table: "Sector",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sector_TypologyId",
                table: "Sector",
                column: "TypologyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sector_Typology_TypologyId",
                table: "Sector",
                column: "TypologyId",
                principalTable: "Typology",
                principalColumn: "TypologyId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
