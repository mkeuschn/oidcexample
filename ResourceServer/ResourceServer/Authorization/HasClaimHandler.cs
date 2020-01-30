using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ResourceServer.Authorization
{
    public class HasClaimHandler : AuthorizationHandler<HasClaimRequirement>, IAuthorizationHandler
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasClaimRequirement requirement)
        {
            if (context.User.HasClaim(c => c.Type == requirement.Claim))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
