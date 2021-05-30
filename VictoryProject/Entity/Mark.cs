namespace VictoryProject.Entity
{
    public class Mark
    {
        public long Id { get; set; }
        public int Value { get; set; }
        public int WorkId { get; set; }
        public Work Work { get; set; }
        public int JudgeId { get; set; }
        public User Judge { get; set; }
    }
}