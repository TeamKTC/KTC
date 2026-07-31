using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KTC.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddDisplayOrderToMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "Media",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

       
        

/// <inheritdoc />
protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.DropColumn(
        name: "DisplayOrder",
        table: "Media");
}
    }
}
