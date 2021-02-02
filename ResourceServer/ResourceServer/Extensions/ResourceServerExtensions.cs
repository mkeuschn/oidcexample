using System;
using System.Threading.Tasks;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ResourceServer.Authorization;
using ResourceServer.Options;

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

        public static IServiceCollection AddResourceServerAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddOAuth2Introspection(options =>
                {
                    var oidc = new OpenIdConnectOptions();
                    configuration.GetSection(OpenIdConnectOptions.Key).Bind(oidc);

                    options.Authority = oidc.Authority;
                    options.ClientId = oidc.ClientId;
                    options.ClientSecret = oidc.Secret;
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