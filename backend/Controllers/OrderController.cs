using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1")]

    public class OrderController : ControllerBase
    {

        private readonly BakeryContext _context;
        public OrderController(BakeryContext context)
        {
            _context = context;
        }

        [HttpGet("order")]
        public IActionResult GetOrders()
        {
            var orders = _context.Orders.ToList();
            return Ok(orders);
        }

        [HttpGet("order/{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(p => p.Id == id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
        [HttpGet("order/user/{userId}")]
        public IActionResult GetOrdersByUserId(string userId)
        {
            var orders = _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(op => op.Product)
            .Where(o => o.UserId == userId)
            .ToList();
            if (orders == null)
            {
                return NotFound();
            }
            return Ok(orders);
        }


        [HttpPost("order")]
        public IActionResult PostOrder([FromBody] Order order) 
        {
            var existingOrder = _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefault(o => o.Id == order.Id);

            if (existingOrder != null)
            {
                
                _context.Entry(existingOrder).CurrentValues.SetValues(order);
                existingOrder.OrderItems.Clear();
                foreach (var item in order.OrderItems)
                {
                    var product = _context.Products.Find(item.ProductId);
                    if (product != null)
                    {
                        existingOrder.OrderItems.Add(new OrderItem
                        {
                            Product = product,
                            Qunatity = item.Qunatity
                        });
                    }
                }
            }
            else
            {
                order.OrderCreatedAt = DateTime.Now;
                foreach (var item in order.OrderItems)
                {
                    var product = _context.Products.Find(item.ProductId);
                    if (product != null)
                    {
                        item.Product = product;
                    }
                }
                _context.Orders.Add(order);
            }

            _context.SaveChanges();
            return CreatedAtAction("PostOrder", new { id = order.Id }, order);
        }

        [HttpPut("order/{id}")]
        public IActionResult UpdateOrder(int id,[FromBody] Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }
            _context.Entry(order).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("order/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(p => p.Id == id);
            if (order == null)
            {
                return NotFound();
            }
            _context.Orders.Remove(order);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
