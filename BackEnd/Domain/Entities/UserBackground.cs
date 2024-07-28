namespace Domain.Entities;

public class UserBackground
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int BackgroundId { get; set; }
    public Background Background { get; set; }
}
