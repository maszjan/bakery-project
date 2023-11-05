namespace backend.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Unit {  get; set; }
        public int Price {  get; set; }

        public List<ProductIngredient> ProductIngredients { get; set; }
    }
}
