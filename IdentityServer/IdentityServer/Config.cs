// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;
using IdentityServer4;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
            new List<IdentityResource>
            { 
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(), 
                new IdentityResources.Address(), 
                new IdentityResources.Email(), 
                new IdentityResources.Phone()
            };

        public static IEnumerable<ApiResource> Apis =>
            new List<ApiResource>
            {
                new ApiResource("resource_server", "Resource Server")
                {
                    ApiSecrets = { new Secret("secret".Sha256()) }
                }
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "FancyApplicationClientId",
                    ClientName = "FancyApplicationClientId",
                    AccessTokenType = AccessTokenType.Reference,
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    AllowedScopes = { 
                        IdentityServerConstants.StandardScopes.OpenId, 
                        IdentityServerConstants.StandardScopes.Profile,
                        "resource_server"
                    },
                    RedirectUris =
                    {
                        "http://localhost:44319/index.html"
                    },
                    AllowedCorsOrigins =
                    {
                        "http://localhost:44319"
                    }
                }
            };

    }
}