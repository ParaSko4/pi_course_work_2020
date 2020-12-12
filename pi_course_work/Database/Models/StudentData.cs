using System;

namespace pi_course_work.Database.Models
{
    public class StudentData
    {
        public StudentData() { }

        public StudentData(int personalDataId, int studentId, int accountId, string fullName, string name, string surname, string middlename, DateTime? birthday, string residence, string number, string sex, DateTime? joindate, string login, string password, string role)
        {
            this.personalDataId = personalDataId;
            this.studentId = studentId;
            this.accountId = accountId;
            this.fullName = fullName;
            this.name = name;
            this.surname = surname;
            this.middlename = middlename;
            this.birthday = birthday;
            this.residence = residence;
            this.number = number;
            this.sex = sex;
            this.joindate = joindate;
            this.login = login;
            this.password = password;
            this.role = role;
        }

        public int personalDataId { get; set; }
        public int studentId { get; set; }
        public int accountId { get; set; }

        public string fullName { get; set; }

        public string name { get; set; }
        public string surname { get; set; }
        public string middlename { get; set; }
        public DateTime? birthday { get; set; }
        public string residence { get; set; }
        public string number { get; set; }
        public string sex { get; set; }
        public DateTime? joindate { get; set; }

        public string login { get; set; }
        public string password { get; set; }
        public string role { get; set; }
    }
}
