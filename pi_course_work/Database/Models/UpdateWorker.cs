using System;

namespace pi_course_work.Database.Models
{
    public class UpdateWorker
    {
        public UpdateWorker() { }

        public UpdateWorker(int workerId, string name, string surname, string middlename, DateTime? birthday, string residence, string number, string sex, string position, string login, string password)
        {
            this.workerId = workerId;
            this.name = name;
            this.surname = surname;
            this.middlename = middlename;
            this.birthday = birthday;
            this.residence = residence;
            this.number = number;
            this.sex = sex;
            this.position = position;
            this.login = login;
            this.password = password;
        }

        public int workerId { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string middlename { get; set; }
        public DateTime? birthday { get; set; }
        public string residence { get; set; }
        public string number { get; set; }
        public string sex { get; set; }
        public string position { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }
}
