using VictoryProject.Enum;

namespace VictoryProject.Entity
{
    public class Application
    {
        public int Id { get; set; }
        public int ContestId { get; set; }
        public Contest Contest { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ApplicationStatusEnum StatusId { get; set; }
    }
}