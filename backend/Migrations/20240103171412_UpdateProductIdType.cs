using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductIdType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductIngredients_Products_ProductId1",
                table: "ProductIngredients");

            migrationBuilder.DropIndex(
                name: "IX_ProductIngredients_ProductId1",
                table: "ProductIngredients");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "ProductIngredients");

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "ProductIngredients",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_ProductIngredients_ProductId",
                table: "ProductIngredients",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductIngredients_Products_ProductId",
                table: "ProductIngredients",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductIngredients_Products_ProductId",
                table: "ProductIngredients");

            migrationBuilder.DropIndex(
                name: "IX_ProductIngredients_ProductId",
                table: "ProductIngredients");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductIngredients",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductId1",
                table: "ProductIngredients",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductIngredients_ProductId1",
                table: "ProductIngredients",
                column: "ProductId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductIngredients_Products_ProductId1",
                table: "ProductIngredients",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
