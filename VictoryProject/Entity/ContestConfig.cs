using System;
using System.Collections.Generic;

#nullable disable

namespace VictoryProject.Entity
{
    public partial class ContestConfig
    {
        public int Id { get; set; }
        public byte[] Content { get; set; }
        public int ContestId { get; set; }

        public virtual Contest Contest { get; set; }
    }
}
