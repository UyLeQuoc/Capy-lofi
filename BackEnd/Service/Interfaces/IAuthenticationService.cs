using Domain.DTOs;
using Domain.DTOs.Response;

namespace Service.Interfaces;

public interface IAuthenticationService
{
    Task<string> GetGoogleLoginUrlAsync();
    Task<Authenticator> HandleGoogleCallbackAsync(string code);
}