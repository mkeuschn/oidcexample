using Microsoft.AspNetCore.Authorization;

namespace ResourceServer.Authorization
{
    public class HasClaimRequirement : IAuthorizationRequirement
    {
        public HasClaimRequirement(string claim)
        {
            Claim = claim;
        }

        public string Claim { get; }
    }
}
