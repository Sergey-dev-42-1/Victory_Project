using System;
using System.Collections.Generic;

#nullable disable

namespace VictoryProject.Entity
{
    public partial class Role
    {
        public Role()
        {
            UserRoleContests = new HashSet<UserRoleContest>();
        }

        public byte Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserRoleContest> UserRoleContests { get; set; }
    }
}
