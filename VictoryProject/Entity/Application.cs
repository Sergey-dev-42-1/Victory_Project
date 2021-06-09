namespace VictoryProject.Entity
{
    public class Application
    {
        public Application()
        {
            
        }
        public int Id { get; set; }
        public int ContestId { get; set; }
        public int UserId { get; set; }
        public byte[] Content { get; set; }
        public byte StatusId { get; set; }

        public Contest Contest { get; set; }
        public User User { get; set; }
    }
}
