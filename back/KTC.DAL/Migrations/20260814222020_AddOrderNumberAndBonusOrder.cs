using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KTC.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderNumberAndBonusOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderNumber",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OrderId",
                table: "Bonuses",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bonuses_OrderId",
                table: "Bonuses",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bonuses_Orders_OrderId",
                table: "Bonuses",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bonuses_Orders_OrderId",
                table: "Bonuses");

            migrationBuilder.DropIndex(
                name: "IX_Bonuses_OrderId",
                table: "Bonuses");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Bonuses");
        }
    }
}
