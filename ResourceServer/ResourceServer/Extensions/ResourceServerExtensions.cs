using System;
using System.Threading.Tasks;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using ResourceServer.Authorization;

namespace ResourceServer.Extensions
{
    public static class ResourceServerExtensions
    {
        public static string CorsPolicy = "CorsPolicy";

        public static IServiceCollection AddResourceServerCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy,
                    builder =>
                    {
                        builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins("http://localhost:44319");
                    });
            });
            return services;
        }

        public static IServiceCollection AddResourceServerAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddOAuth2Introspection(options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.ClientId = "resource_server";
                    options.ClientSecret = "secret";
                    options.Events.OnAuthenticationFailed = async context => await Task.Factory.StartNew(() =>
                    {
                        Console.WriteLine(context.Error);
                    });
                    options.Events.OnTokenValidated = async context => await Task.Factory.StartNew(() =>
                    {
                        Console.WriteLine(context.Result);
                    });
                });
            return services;
        }

        public static IServiceCollection AddResourceServerAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ClaimPolicy", builder => builder.Requirements.Add(new HasClaimRequirement("active")));
            });

            services.AddSingleton<IAuthorizationHandler, HasClaimHandler>();
            return services;
        }
    }
}