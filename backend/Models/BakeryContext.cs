using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class BakeryContext(DbContextOptions<BakeryContext> options) : IdentityDbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<ProductIngredient> ProductIngredients { get; set; }

    }
}
