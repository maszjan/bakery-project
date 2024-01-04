using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1")]

    public class IngredientController : ControllerBase
    {
        private readonly BakeryContext _context;
        public IngredientController(BakeryContext context)
        {
            _context = context;
        }

        [HttpGet("ingredient")]
        public IActionResult GetIngredients()
        {    
            var ingredients = _context.Ingredients.ToList();
            return Ok(ingredients);
        }

       [HttpGet("ingredient/{id}")]
        public IActionResult GetIngredient(int id)
        {
            var ingredient = _context.Ingredients.FirstOrDefault(p => p.Id == id);
            if(ingredient == null)
            {
                return NotFound();
            }
            return new JsonResult(ingredient);
        }

        [HttpGet("generateIngredients/{orderId}")]
        public IActionResult generateIngredients(int orderId)
        {
            var order = _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).FirstOrDefault(o => o.Id == orderId);
            if (order == null)
            {
                return NotFound();
            }

            var result = new List<object>();

            
            foreach (var orderItem in order.OrderItems)
            {
               
                var productIngredients = _context.ProductIngredients
                    .Include(pi => pi.Ingredient)
                    .Where(pi => pi.ProductId == orderItem.Product.Id)
                    .ToList();

               
                var ingredientsForProduct = productIngredients.Select(pi => new 
                {
                    ProductId = orderItem.Product.Id,
                    IngredientId = pi.Ingredient.Id,
                    IngredientName = pi.Ingredient.Name,
                    Quantity = pi.Quantity * orderItem.Qunatity,
                    Unit = pi.Ingredient.Unit
                });

                result.AddRange(ingredientsForProduct);
    }

    return Ok(result);
        }

        [HttpPost("ingredient")]
        public IActionResult CreateIngredient([FromBody] Ingredient ingredient)
        {
            _context.Ingredients.Add(ingredient);
            _context.SaveChanges();
            return CreatedAtAction("GetIngredient", new { id = ingredient.Id }, ingredient);
        }

        [HttpPut("ingredient/{id}")]
        public IActionResult UpdateIngredient(int id, [FromBody] Ingredient ingredient)
        {
            if (id != ingredient.Id)
            {
                return BadRequest();
            }
            _context.Entry(ingredient).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("ingredient/{id}")]
        public IActionResult DeleteIngredient(int id)
        {
            var ingredient = _context.Ingredients.FirstOrDefault(p=>p.Id == id);
            if(ingredient == null)
            {
                return NotFound();
            }
            _context.Ingredients.Remove(ingredient);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
