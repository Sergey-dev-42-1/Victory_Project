using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using VictoryProject.Entity;

namespace VictoryProject.Controllers
{
    [ApiController]
    public class ApiController : Controller
    {
        private readonly DbContext _dbContext;
        private readonly ILogger _logger;

        public ApiController(DbContext dbContext, ILogger logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("[action]")]
        public async Task<IActionResult> Login(string email, string password)
        {
            if (ModelState.IsValid)
            {
                User user = await _dbContext.Set<User>()
                    .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
                if (user != null)
                {
                    await Authenticate(email);

                    return Ok();
                }

                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
                return BadRequest();
            }

            return Ok();
        }

        [Route("[action]")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Необходимые поля не заполнены");
            }

            var checkUser = await _dbContext.Set<User>().FirstOrDefaultAsync(u => u.Email == user.Email);
            
            if (checkUser != null)
            {
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }

            await _dbContext.Set<User>().AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await Authenticate(user.Email);
            return Ok();
        }

        private async Task Authenticate(string email)
        {
            try

            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, email)
                };
                ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(id));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }
        [Route("[action]")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("Что-то разломалось на logout");
            }
        }
        [Authorize]
        [HttpPost]
        [Route("add_contest")]
        public async Task<IActionResult> AddContest(Contest contest)
        {
            try
            {
                await _dbContext.Set<Contest>().AddAsync(contest);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e,e.Message);
                return BadRequest("Что-то разломалось на создании конкурса");

            }
        }
    }
}