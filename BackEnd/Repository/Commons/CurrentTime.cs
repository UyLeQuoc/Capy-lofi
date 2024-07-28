using Repository.Interfaces;

namespace Repository.Commons;

public class CurrentTime : ICurrentTime
{
    public DateTime GetCurrentTime()
    {
        return DateTime.UtcNow.AddHours(7);
    }
}