using EyeAI.API.Data;
using EyeAI.API.DTOs;
using EyeAI.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace EyeAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }


        // ================================
        // REGISTER
        // POST: /api/Auth/register
        // ================================

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Please fill in all fields."
                });
            }


            // Email kontrolü

            var existingEmail = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (existingEmail != null)
            {
                return BadRequest(new
                {
                    message = "This email is already registered."
                });
            }


            // Username kontrolü

            var existingUsername = await _context.Users
                .FirstOrDefaultAsync(x => x.Username == request.Username);

            if (existingUsername != null)
            {
                return BadRequest(new
                {
                    message = "This username is already taken."
                });
            }


            // Yeni kullanıcı

            var user = new User
            {
                Username = request.Username.Trim(),
                Email = request.Email.Trim().ToLower()
            };


            // Şifreyi hashle

            user.PasswordHash =
                _passwordHasher.HashPassword(
                    user,
                    request.Password
                );


            _context.Users.Add(user);

            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Registration successful!"
            });
        }


        // ================================
        // LOGIN
        // POST: /api/Auth/login
        // ================================

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Please enter both email and password."
                });
            }


            // Kullanıcıyı bul

            var user = await _context.Users
                .FirstOrDefaultAsync(
                    x => x.Email == request.Email.Trim().ToLower()
                );


            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }


            // Şifre kontrolü

            var passwordResult =
                _passwordHasher.VerifyHashedPassword(
                    user,
                    user.PasswordHash,
                    request.Password
                );


            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }


            return Ok(new
            {
                message = "Login successful!",

                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email
                }
            });
        }
    }
}