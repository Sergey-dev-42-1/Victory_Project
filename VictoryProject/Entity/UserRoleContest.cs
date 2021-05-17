#nullable disable

namespace VictoryProject.Entity
{
    public class UserRoleContest
    {
        public long Id { get; set; }
        public int ContestId { get; set; }
        public byte RoleId { get; set; }
        public int UserId { get; set; }

        public virtual Contest Contest { get; set; }
        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}