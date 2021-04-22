using System;
using System.Collections.Generic;

#nullable disable

namespace VictoryProject.Entity
{
    public partial class User
    {
        public User()
        {
            UserRoleContests = new HashSet<UserRoleContest>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public virtual ICollection<UserRoleContest> UserRoleContests { get; set; }
    }
}
