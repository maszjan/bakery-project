using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Services 
        builder.Services.AddDbContext<BakeryContext>(options =>
           options.UseSqlServer(builder.Configuration.GetConnectionString("bakeryDBCon")));
        builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<BakeryContext>().AddApiEndpoints();
        builder.Services.AddControllers();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
        builder.Services.AddAuthorizationBuilder();
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("MyCorsPolicy", builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        }); 

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("MyCorsPolicy");
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapIdentityApi<User>();
        app.MapControllers();

        app.Run();
    }
}