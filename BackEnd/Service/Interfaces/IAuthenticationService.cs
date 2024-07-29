using Domain.DTOs;
using Domain.DTOs.Response;
using Repository.Commons;

namespace Service.Interfaces;

public interface IAuthenticationService
{
    Task<Authenticator> AuthenGoogleUser(string token);
    Task<ApiResult<object>> UserGetInfoSignUpByGoogle(string token);


}