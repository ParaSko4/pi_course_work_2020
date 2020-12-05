using System;

namespace pi_course_work.Database.Models
{
    public class StudentAdd
    {
        public StudentAdd() { }

        public StudentAdd(int schoolId, int classId, string name, string surname, string middlename, DateTime? birthday, string residence, string number, string sex)
        {
            this.schoolId = schoolId;
            this.classId = classId;
            this.name = name;
            this.surname = surname;
            this.middlename = middlename;
            this.birthday = birthday;
            this.residence = residence;
            this.number = number;
            this.sex = sex;
        }

        public int schoolId { get; set; }
        public int classId { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string middlename { get; set; }
        public DateTime? birthday { get; set; }
        public string residence { get; set; }
        public string number { get; set; }
        public string sex { get; set; }
    }
}
