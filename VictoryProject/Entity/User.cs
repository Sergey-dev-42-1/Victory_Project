using System.Collections.Generic;


namespace VictoryProject.Entity
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public List<Application> Applications { get; set; }
        public List<Mark> Marks { get; set; }
        public List<UserRoleContest> UserRoleContests { get; set; }
        public List<Work> Works { get; set; }
    }
}