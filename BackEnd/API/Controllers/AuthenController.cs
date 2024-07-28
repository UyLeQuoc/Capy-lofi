using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Service.Interfaces;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthenticationService authenticationService, IConfiguration configuration)
        {
            _authenticationService = authenticationService;
            _configuration = configuration;
        }

        /// <summary>
        /// Get Google login URL
        /// </summary>
        /// <returns>The Google login URL</returns>
        [HttpGet("login-url")]
        public async Task<IActionResult> GetGoogleLoginUrl()
        {
            var loginUrl = await _authenticationService.GetGoogleLoginUrlAsync();
            return Ok(new { LoginUrl = loginUrl });
        }

        /// <summary>
        /// Handle Google callback
        /// </summary>
        /// <param name="code">Authorization code from Google</param>
        /// <returns>Access and Refresh Tokens</returns>
        [HttpGet("google-callback")]
        public async Task<IActionResult> HandleGoogleCallback([FromQuery] string code)
        {
            var result = await _authenticationService.HandleGoogleCallbackAsync(code);
            return Ok(result);
        }
    }
}