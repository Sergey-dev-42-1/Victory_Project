using System;
using System.Collections.Generic;

namespace VictoryProject.Entity
{
    public class Contest
    {
        public Contest()
        {
        }

        private Contest(string name, string comment, in DateTime startDate, in DateTime endDate,
            in DateTime startRegistrationDate, in DateTime endRegistrationDate)
        {
            Name = name;
            Comment = comment;
            StartDate = startDate;
            EndDate = endDate;
            StartRegistrationDate = startRegistrationDate;
            EndRegistrationDate = endRegistrationDate;
        }


        public static Contest Create(string name, string comment, DateTime startDate, DateTime endDate,
            DateTime startRegistrationDate, DateTime endRegistrationDate)
        {
            return new Contest(name, comment, startDate, endDate, startRegistrationDate, endRegistrationDate);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartRegistrationDate { get; set; }
        public DateTime EndRegistrationDate { get; set; }

        public List<Application> Applications { get; set; }
        public List<ContestConfig> ContestConfigs { get; set; }
        public List<UserRoleContest> UserRoleContests { get; set; }
        public List<Work> Works { get; set; }
    }
}