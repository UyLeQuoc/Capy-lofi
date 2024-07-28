namespace Domain.Entities;

public class Feedback : BaseEntity
{
    public int UserId { get; set; }
    public User User { get; set; }
    public string FeedbackText { get; set; }
    public DateTime CreatedAt { get; set; }
}