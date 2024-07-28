namespace Domain.DTOs.MusicsDTOs
{
    public class CreateMusicDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string MusicUrl { get; set; }
        public string? ThumbnailUrl { get; set; }
        public float Size { get; set; }
        public int Duration { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
    }
}
