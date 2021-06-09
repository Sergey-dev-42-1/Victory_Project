using System.Collections.Generic;


namespace VictoryProject.Entity
{
    public class Work
    {
        public Work()
        {
            
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public int ContestId { get; set; }

        public Contest Contest { get; set; }
        public User User { get; set; }
        public List<Mark> Marks { get; set; }
    }
}