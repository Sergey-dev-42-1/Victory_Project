using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using VictoryProject.DBContext;
using VictoryProject.Entity;
using VictoryProject.Enum;
using VictoryProject.ViewModel;

namespace VictoryProject.Controller
{
    [Route("api/")]
    [ApiController]
    public class ContestController : ControllerBase
    {
        private readonly VictoryContext _dbContext;
        private readonly HttpContext _httpContext;


        public ContestController(VictoryContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContext = httpContextAccessor.HttpContext;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model state isn't valid");

            var user = await _dbContext.Set<User>()
                .FirstOrDefaultAsync(u =>
                    u.Email == loginViewModel.Email && u.Password == loginViewModel.Password);

            if (user == null)
                return BadRequest("Неверный логин или пароль");

            await Authenticate(loginViewModel.Email);
            return Ok(user);
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(User user)
        {
            Console.WriteLine("Register request accepted");
            if (!ModelState.IsValid) return BadRequest("Необходимые поля не заполнены");

            var checkUser = await _dbContext.Set<User>().FirstOrDefaultAsync(u => u.Email == user.Email);

            if (checkUser != null)
            {
                return BadRequest("Пользователь с таким электронным адресом уже зарегистрирован");
            }

            await _dbContext.Set<User>().AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await Authenticate(user.Email);
            return Ok();
        }

        private async Task Authenticate(string email)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, email)
            };
            var id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(id));
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
        [Route("addcontest")]
        public async Task<IActionResult> AddContest(Contest contest)
        {
            try
            {
                var currentUser = await GetCurrentUser();
                var ownerRole =
                    await _dbContext.Set<Role>()
                        .FirstOrDefaultAsync(role => role.Id == (byte) RoleEnum.Owner);
                var createdContest = Contest.Create(contest.Name, contest.Comment, contest.StartDate, contest.EndDate,
                    contest.StartRegistrationDate, contest.EndRegistrationDate);
                await _dbContext.Set<Contest>().AddAsync(createdContest);
                var userRoleContest = UserRoleContest.Create(createdContest, currentUser, ownerRole);
                await _dbContext.Set<UserRoleContest>()
                    .AddAsync(userRoleContest);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("Creating Contest Failed");
            }
        }

        [HttpGet]
        [Route("getaffiliatedcontests")]
        public async Task<JsonResult> GetAffiliatedContests()
        {
            var currentUser = await GetCurrentUser();
            var contests = await _dbContext.Set<Contest>()
                .Where(contest =>
                    contest.UserRoleContests.Exists(roleContest => roleContest.User.Email == currentUser.Email))
                .AsNoTracking()
                .ToListAsync();
            return new JsonResult(JsonConvert.SerializeObject(contests));
        }

        public async Task<User> GetCurrentUser()
        {
            return await _dbContext.Set<User>()
                .FirstOrDefaultAsync(user => user.Email.Equals(_httpContext.User.Identity.Name));
        }

        [Route("deletecontest")]
        public async Task<IActionResult> DeleteContest([FromQuery] int contestId)
        {
            try
            {
                var contest = await _dbContext.Set<Contest>()
                    .FirstOrDefaultAsync(c => c.Id == contestId);
                _dbContext.Remove(contest);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("Remove contest Failed");
            }
        }

        [HttpGet]
        [Route("getalluserapplications")]
        public async Task<JsonResult> GetUserApplications([FromQuery] int contestId)
        {
            var currentUser = await GetCurrentUser();
            var applications = _dbContext.Set<Application>()
                .AsNoTracking()
                .Where(application => application.ContestId == contestId && application.UserId == currentUser.Id)
                .ToListAsync();
            return new JsonResult(JsonConvert.SerializeObject(applications));
        }

        [HttpGet]
        [Route("getallapplications")]
        public async Task<IActionResult> GetContestApplications([FromQuery] int contestId)
        {
            var currentUser = await GetCurrentUser();
            if (await _dbContext.Set<UserRoleContest>()
                .AsNoTracking()
                .FirstOrDefaultAsync(urc =>
                    urc.ContestId == contestId && urc.RoleId == (byte) RoleEnum.Owner &&
                    urc.UserId == currentUser.Id) == null)
            {
                return BadRequest("Current user is not owner of this contest");
            }

            var applications = await _dbContext.Set<Application>()
                .AsNoTracking()
                .Where(app => app.ContestId == contestId)
                .ToListAsync();
            return new JsonResult(JsonConvert.SerializeObject(applications));
        }

        public async Task<IActionResult> GetContest([FromQuery] int contestId)
        {
            var contest = await _dbContext.Set<Contest>()
                .AsNoTracking()
                .FirstOrDefaultAsync(con => con.Id == contestId);
            return new JsonResult(JsonConvert.SerializeObject(contest));
        }


        [Authorize]
        [HttpGet]
        [Route("getallcontests")]
        public async Task<IActionResult> GetAllContests()
        {
            Console.WriteLine("sentContests");
            try
            {
                var contests = await _dbContext.Set<Contest>()
                    .AsNoTracking()
                    .ToListAsync();
                return new JsonResult(JsonConvert.SerializeObject(contests));
            }
            catch (Exception e)
            {
                return BadRequest("Что-то разломалось на создании конкурса");
            }
        }

        [HttpGet]
        [Route("test")]
        public async Task<IActionResult> Test()
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