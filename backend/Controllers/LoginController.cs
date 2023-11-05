using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1")]

    public class LoginController : ControllerBase
    {
        private readonly BakeryContext _context;
        public LoginController(BakeryContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
    public async Task<IActionResult> UserLogin(User user)
        {
            if (user != null)
            {
                var resultLoginCheck = _context.Users.Where(p => p.Email == user.Email && p.Password == user.Password).FirstOrDefault();

                if (resultLoginCheck == null)
                {
                    return BadRequest("Inavalid login data");
                }
                else
                {
                    return Ok(user);
                }
            }
            else
            {
                return BadRequest("Empty request");
            }
        }
    }


}
