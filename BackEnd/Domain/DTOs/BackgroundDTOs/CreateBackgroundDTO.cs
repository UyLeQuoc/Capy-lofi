namespace Domain.DTOs.BackgroundDTOs
{
    public class CreateBackgroundDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string BackgroundUrl { get; set; }
        public float Size { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
    }
}
