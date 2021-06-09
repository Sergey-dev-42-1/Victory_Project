using System;
using System.Collections.Generic;

#nullable disable

namespace VictoryProject.Entity
{
    public partial class Mark
    {
        public long Id { get; set; }
        public int Value { get; set; }
        public int WorkId { get; set; }
        public int JudgeId { get; set; }

        public virtual User Judge { get; set; }
        public virtual Work Work { get; set; }
    }
}
