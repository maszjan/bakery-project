using backend.Models;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using System.IO;

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
            var orders = _context.Orders
              .Include(o => o.OrderItems)
              .ThenInclude(i => i.Product)
              .ToList();

            if (orders == null)
            {
                return NotFound();
            }
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
        .ThenInclude(i => i.Product)
        .Where(o => o.UserId == userId)
        .ToList();

            if (orders == null)
            {
                return NotFound();
            }
            return Ok(orders);
        }


        [HttpGet("{id}/document")]
        public IActionResult GetInvoice(int id)
        {
            
            var order = _context.Orders.FirstOrDefault(p => p.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            var orderItems = _context.OrderItems
            .Where(oi => oi.OrderId == id)
            .Include(oi => oi.Product)
            .ToList();


            Document document = new Document();

           
            MemoryStream stream = new MemoryStream();
            PdfWriter writer = PdfWriter.GetInstance(document, stream);
            writer.CloseStream = false;


            document.Open();

            
            document.Add(new Paragraph($"Invoice for Order: {order.Id}"));
            document.Add(new Paragraph($"Order Date: {order.OrderCreatedAt}")); 

            
            document.Add(new Paragraph("\n"));

            foreach (var item in orderItems)
            {
                document.Add(new Paragraph($"Product: {item.Product.Name}, Quantity: {item.Qunatity}, Price: ${item.Price}, Discount: ${item.Discount}, Sum: ${item.TotalPrice}")); 
            }

            document.Add(new Paragraph("\n"));

 
            document.Add(new Paragraph($"Total: {order.OrderTotal}")); 

            
            document.Close();

            
            stream.Position = 0;

            
            return File(stream, "application/pdf", $"Invoice_{order.Id}.pdf");
        }

        [HttpPost("order")]
        public IActionResult PostOrder([FromBody] Order order) 
        {
            var user = _context.Users.Find(order.UserId);

            if (user == null)
            {
                return NotFound();
            }
            if (user.IsCompanyClient)
            { 
                const int discount = 5;

                foreach (var item in order.OrderItems)
                {
                    item.Discount = discount;
                    item.TotalPrice -= discount;
                }
            }
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
                            Qunatity = item.Qunatity,
                            Discount = item.Discount,
                            TotalPrice = item.TotalPrice
                        });
                    }
                }
            }
            else
            {
                order.OrderCreatedAt = DateTime.Now;
                order.OrderStatus = "New";
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
