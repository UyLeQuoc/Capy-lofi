namespace Domain.Entities;

public class Background : BaseEntity
{
    public string Name { get; set; }
    public string BackgroundUrl { get; set; }
    public float Size { get; set; }
    public int Price { get; set; }
    public string Status { get; set; }
        
    public ICollection<UserBackground> UserBackgrounds { get; set; }
}