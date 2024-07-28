namespace Domain.Entities;

public class Music : BaseEntity
{
    public string Name { get; set; }
    public string MusicUrl { get; set; }
    public string? ThumbnailUrl { get; set; }
    public float Size { get; set; }
    public int Duration { get; set; } 
    public int Price { get; set; }
    public string Status { get; set; }

    public ICollection<UserMusic> UserMusics { get; set; }
}