namespace Repository.Interfaces;

public interface IClaimsService
{
    public int GetCurrentUserId { get; }

    public string? IpAddress { get; }

}