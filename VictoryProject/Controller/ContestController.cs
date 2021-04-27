using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json;
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
    
    
    [Route("api/")]
    [ApiController]
    public class ContestController : ControllerBase
    {
        private readonly VictoryContext _dbContext;


        public ContestController(VictoryContext dbContext)
        {
            _dbContext = dbContext;

        }

        //Пример рабочего обработчика, я не совсем понимаю как это должно работать, но насколько я понял,
        //по умолчанию JSON пропихивается как есть(Регистрация пролезла без проблем)
        // а если он соответствует какой-то из моделей, то он автоматически десериализуется на отдельные поля, 
        // Если разобрать запрос с помощью JsonElement, то можно вытащить из тела все что нужно
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] JsonElement body)
        {
            string Email = body.GetProperty("Email").ToString();
            string Password = body.GetProperty("Password").ToString();
            Console.WriteLine(body.GetProperty("Password"));
            if (ModelState.IsValid)
            {
                Console.WriteLine(Email+" : "+ Password);
                Console.WriteLine("Model validation passed");
                User user = await _dbContext.Set<User>()
                    .FirstOrDefaultAsync(u => u.Email == Email && u.Password == Password);
                Console.WriteLine(user);
                if (user != null)
                {
                    
                    await Authenticate(Email);

                    return Ok(user);
                }

               
            }

            return Ok();
        }

        
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(User user)
        {
            Console.WriteLine("Register request accepted");
            if (!ModelState.IsValid)
            {
                return BadRequest("Необходимые поля не заполнены");
            }

            var checkUser = await _dbContext.Set<User>().FirstOrDefaultAsync(u => u.Email == user.Email);
            
            if (checkUser != null)
            {
                ModelState.AddModelError("", "Пользователь с таким электронным адресом уже зарегестрирован");
                return BadRequest("Пользователь с таким электронным адресом уже зарегестрирован");
            }

            await _dbContext.Set<User>().AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await Authenticate(user.Email);
            return Ok();
        }

        private async Task Authenticate(string email)
        {
            Console.Write("Authentification");
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
              Console.WriteLine("Auth error");
            }
        }
        [Route("[action]")]
        public async Task<IActionResult> Logout()
        {
            Console.WriteLine("recievedLogout");
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
        [ValidateAntiForgeryToken]
        [HttpPost]
        [Route("addcontest")]
        public async Task<IActionResult> AddContest(Contest contest)
        {
            Console.WriteLine("recievedContest");
            try
            {
                await _dbContext.Set<Contest>().AddAsync(contest);
                return Ok();
            }
            catch (Exception e)
            {

                return BadRequest("Что-то разломалось на создании конкурса");

            }
        }
        [HttpGet]
        [Route("test")]
        public async Task<IActionResult> test()
        {

            try
            {
                return Ok("All is well");
            }
            catch (Exception e)
            {
                Console.WriteLine("Проблемка");

                return BadRequest("Что-то разломалось на получении конкурсов");

            }
        }
    }
}