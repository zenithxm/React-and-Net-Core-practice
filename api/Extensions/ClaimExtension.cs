using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;

namespace api.Extensions
{
    public static class ClaimExtension
    {
        public static async Task<AppUser> GetUserLoginAsync(this ClaimsPrincipal user, UserManager<AppUser> userManager)
        {
            //return user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/wa/2005/05/identity/claims/givenname")).Value;
            var username = user.FindFirst(ClaimTypes.GivenName)?.Value;
            if (username == null) return null;
            return await userManager.FindByNameAsync(username);
        }
    }
}