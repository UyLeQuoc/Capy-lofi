namespace Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public string PhotoUrl { get; set; }
    public int Coins { get; set; }
    public string ProfileInfo { get; set; }
    public string RefreshToken { get; set; }

    public ICollection<LearningSession> LearningSessions { get; set; }
    public ICollection<Order> Orders { get; set; }
    public ICollection<UserMusic> UserMusics { get; set; }
    public ICollection<UserBackground> UserBackgrounds { get; set; }
    public ICollection<Feedback> Feedbacks { get; set; }
}
