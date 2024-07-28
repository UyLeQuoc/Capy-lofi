namespace Domain.Entities;

public class Order : BaseEntity
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int ItemId { get; set; }
    public string ItemType { get; set; }
    public DateTime OrderDate { get; set; }
    public int Price { get; set; }
}