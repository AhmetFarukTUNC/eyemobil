using EyeAI.API.Data;
using EyeAI.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EyeAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactMessage contactMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            contactMessage.CreatedAt = DateTime.UtcNow;

            _context.ContactMessages.Add(contactMessage);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Your message has been sent successfully."
            });
        }
    }
}