using System.Collections.Generic;

#nullable disable

namespace VictoryProject.Entity
{
    public class User
    {

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public List<UserRoleContest> UserRoleContests { get; set; }
        
        
    }
}