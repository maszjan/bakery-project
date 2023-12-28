using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class ProductController : ControllerBase
    {
        private readonly BakeryContext _context;
        public ProductController(BakeryContext context)
        {
            _context = context;
        }

        [HttpGet("product")]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        [HttpGet("product/{id}")]
        public IActionResult GetProduct(string id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if ( product == null)
            {
                return NotFound();
            }
            return new JsonResult(product);
        }

        [HttpPost("product")]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction("CreateProduct", new { id = product.Id }, product);
        }

      [HttpPut("product/{id}")]
      public IActionResult UpdateProduct(string id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("product/{id}")]

        public IActionResult DeleteProduct(string id) 
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if ( product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
