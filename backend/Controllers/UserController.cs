using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class UserController(BakeryContext context) : ControllerBase
    {
        private readonly BakeryContext _context = context;

        [HttpGet("user")]
        public IActionResult GetUsers() 
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

     
        [HttpGet("user/{id}")]
        public IActionResult GetUser(string id)
        {
            var user = _context.Users.FirstOrDefault(p=> p.Id == id);
            if(user == null)
            {
                return NotFound();
            }
            return new JsonResult(user);
        }

        [HttpPost("user")]
        public IActionResult CreateUser([FromBody] User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
 
        [HttpPut("user/{id}")]
        public IActionResult UpdateUser(string id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("user/{id}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _context.Users.FirstOrDefault(p=>p.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
