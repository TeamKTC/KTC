using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KTC.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProductNameAndPriceFromCartItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "CartItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "CartItems",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "CartItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
