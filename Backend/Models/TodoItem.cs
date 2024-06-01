namespace Backend.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public bool IsComplete { get; set; }
    }
}
