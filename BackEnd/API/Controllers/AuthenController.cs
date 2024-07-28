using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Service.Interfaces;

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

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] string token)
        {
            try
            {
                var checkToken = await _authenticationService.AuthenGoogleUser(token);
                return Ok(checkToken);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        /// <summary>
        /// Signs up a user using Google authentication.
        /// </summary>
        [HttpPost("user/google-signup")]
        public async Task<IActionResult> StudentSignupByGoogle([FromQuery] string token)
        {
            try
            {
                var checkToken = await _authenticationService.UserGetInfoSignUpByGoogle(token);
                return Ok(checkToken);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}