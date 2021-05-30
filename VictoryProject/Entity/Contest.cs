using System;
using System.Collections.Generic;


namespace VictoryProject.Entity
{
    public class Contest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartRegistrationDate { get; set; }
        public DateTime EndRegistrationDate { get; set; }

        public List<UserRoleContest> UserRoleContests { get; set; }
    }
}