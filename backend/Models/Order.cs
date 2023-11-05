namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public string OrderStatus { get; set; }
        public int OrderTotal { get; set; }

        public string Document {  get; set; }

        public DateTime OrderCreatedAt { get; set; }


    }
}
