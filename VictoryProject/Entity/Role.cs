using System.Collections.Generic;
using VictoryProject.Enum;

namespace VictoryProject.Entity
{
    public class Role
    {
        public RoleEnum Id { get; set; }
        public string Name { get; set; }

        public List<UserRoleContest> UserRoleContests { get; set; }
    }
}