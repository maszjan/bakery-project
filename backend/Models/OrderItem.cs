﻿namespace backend.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string ProductId { get; set; }
        public Product Product { get; set; }
        public int Qunatity { get; set; }
        public int Price { get; set; }
        public int Discount {  get; set; }
        public int TotalPrice {  get; set; }
        
    }
}
