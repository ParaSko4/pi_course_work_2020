using System;

namespace pi_course_work.Database.Models
{
    public class WorkerData
    {
        public WorkerData() { }
        public WorkerData(int workerId, string position, int idpersonaldata, string name, string surname, string middlename, string fullname, DateTime? birthday, string residence, string number, string sex, DateTime? joindate, int accountId, string login, string password, string role)
        {
            this.workerId = workerId;
            this.position = position;
            this.personalDataId = idpersonaldata;
            this.name = name;
            this.surname = surname;
            this.middlename = middlename;
            this.birthday = birthday;
            this.residence = residence;
            this.number = number;
            this.sex = sex;
            this.joindate = joindate;
            this.accountId = accountId;
            this.login = login;
            this.password = password;
            this.role = role;

            this.fullName = fullname;
        }

        public int workerId { get; set; }
        public int accountId { get; set; }
        public int personalDataId { get; set; }

        public string name { get; set; }
        public string surname { get; set; }
        public string middlename { get; set; }
        public string fullName { get; set; }
        public DateTime? birthday { get; set; }
        public string residence { get; set; }
        public string number { get; set; }
        public string sex { get; set; }
        public DateTime? joindate { get; set; }

        public string position { get; set; }

        public string login { get; set; }
        public string password { get; set; }
        public string role { get; set; }
    }
}