namespace pi_course_work.Database.Models
{
    public class Student
    {
        public Student() { }

        public Student(int id, int idclass, int idpersonaldata)
        {
            this.id = id;
            this.idclass = idclass;
            this.idpersonaldata = idpersonaldata;
        }

        public int id { get; set; }
        public int idclass { get; set; }
        public int idpersonaldata { get; set; }
    }
}
