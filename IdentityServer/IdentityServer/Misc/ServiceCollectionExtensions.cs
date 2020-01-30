using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer.Misc
{
    public static class ServiceCollectionExtensions
    {
        public static string CorsPolicy = "CorsPolicy";

        public static IServiceCollection AddCustomCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy,
                    builder =>
                    {
                        builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin();
                        //.AllowCredentials();
                    });
            });
            return services;
        }
    }
}
