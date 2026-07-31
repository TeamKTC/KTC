namespace KTC.DAL.Entities;

public enum MediaType
{
    Image,
    Video
}

public class MediaEntity : BaseEntity
{
    public string FileName { get; set; } = default!;

    public string Url { get; set; } = default!;

    public MediaType Type { get; set; }

    public string ContentType { get; set; } = default!; // image/jpeg, video/mp4

    public long Size { get; set; }

    public int DisplayOrder { get; set; }

    public string? ProductId { get; set; }
    public ProductEntity? Product { get; set; }
}