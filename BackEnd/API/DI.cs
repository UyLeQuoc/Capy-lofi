using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Repository;
using Repository.Commons;
using Repository.Interfaces;
using Service.Interfaces;
using Service;

namespace API.Dependencies
{
    public static class DI
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Add ApplicationDbContext with SQL Server
            services.AddDbContext<CapyLofiDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("PhucString")));

            // Add authentication services
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
                })
                .AddCookie()
                .AddGoogle(options =>
                {
                    options.ClientId = configuration["Authentication:Google:ClientId"];
                    options.ClientSecret = configuration["Authentication:Google:ClientSecret"];
                    options.CallbackPath = "/api/auth/google-callback"; // Ensure this matches the Google API Console
                });

            services.AddScoped<IAuthenticationService, GoogleAuthenticationService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ITokenGenerators, TokenGenerators>();
            services.AddScoped<ICurrentTime, CurrentTime>();
            services.AddScoped<IClaimsService, ClaimsService>();
            services.AddHttpContextAccessor(); 
            services.AddHttpClient<GoogleAuthenticationService>();

            return services;
        }
    }
}
