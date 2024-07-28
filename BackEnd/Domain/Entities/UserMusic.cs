namespace Domain.Entities;

public class UserMusic
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int MusicId { get; set; }
    public Music Music { get; set; }
}