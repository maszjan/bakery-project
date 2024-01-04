namespace backend.Models
{
    public class ProductIngredient
    {
        public int Id { get; set; }
        public string ProductId {  get; set; }
        public Product Product { get; set; }

        public int IngredientId {  get; set; }
        public Ingredient Ingredient { get; set; }

        public int Quantity { get; set; }   
    }
}
