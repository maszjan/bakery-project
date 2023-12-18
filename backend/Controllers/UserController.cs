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

     
        [HttpGet("user/{Email}")]
        public IActionResult GetUser(string email)
        {
            var user = _context.Users.FirstOrDefault(p=> p.Email == email);
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
            var userToUpdate = _context.Users.FirstOrDefault(p => p.Id == id);
            if (id != user.Id)
            {
                return BadRequest();
            }
            userToUpdate.Name = user.Name;
            userToUpdate.SurName = user.SurName;
            userToUpdate.Address = user.Address;
            userToUpdate.Email = user.Email;
            userToUpdate.Id = user.Id;
            userToUpdate.City = user.City;
            userToUpdate.Postcode = user.Postcode;
            userToUpdate.Country = user.Country;
            userToUpdate.IsCompanyClient = user.IsCompanyClient;

            _context.Users.Update(userToUpdate);
            _context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("user/{Id}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _context.Users.FirstOrDefault(p => p.Id == id);
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
