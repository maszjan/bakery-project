namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } 
        
        public string OrderStatus { get; set; }
        public int OrderTotal { get; set; }

        public string Document {  get; set; }

        public DateTime OrderCreatedAt { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}

