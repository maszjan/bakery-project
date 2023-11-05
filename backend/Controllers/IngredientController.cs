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
