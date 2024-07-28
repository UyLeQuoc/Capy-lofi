namespace Domain.Entities;

public class LearningSession : BaseEntity
{
    public int UserId { get; set; }
    public User User { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int CoinsEarned { get; set; }
}