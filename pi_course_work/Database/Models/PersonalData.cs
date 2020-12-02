using System;

namespace pi_course_work.Database.Models
{
    public class PersonalData
    {
        public PersonalData() { }

        public PersonalData(int id, string name, string surname, string middlename, DateTime birthday, string residence, string number, string sex,DateTime joindate, int idschool)
        {
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.middlename = middlename;
            this.birthday = birthday;
            this.residence = residence;
            this.number = number;
            this.sex = sex;
            this.joindate = joindate;
            this.idschool = idschool;
        }

        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string middlename { get; set; }
        public DateTime? birthday { get; set; }
        public string residence { get; set; }
        public string number { get; set; }
        public string sex { get; set; }
        public DateTime? joindate { get; set; }
        public int idschool { get; set; }

    }
}