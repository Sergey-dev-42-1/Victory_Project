using VictoryProject.Enum;

#nullable disable

namespace VictoryProject.Entity
{
    public class UserRoleContest
    {
        public long Id { get; set; }
        public int ContestId { get; set; }
        public RoleEnum RoleId { get; set; }
        public int UserId { get; set; }

        public Contest Contest { get; set; }
        public Role Role { get; set; }
        public User User { get; set; }

        private UserRoleContest(Contest contest, User user, Role role)
        {
            Contest = contest;
            User = user;
            Role = role;
        }

        public static UserRoleContest Create(Contest contest, User user, Role role)
        {
            return new UserRoleContest(contest, user, role);
        }
    }
}