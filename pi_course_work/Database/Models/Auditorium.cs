namespace pi_course_work.Database.Models
{
    public class Auditorium
    {
        public Auditorium() { }

        public Auditorium(int id, string number, string name, int idschool)
        {
            this.id = id;
            this.number = number;
            this.name = name;
            this.idschool = idschool;
        }

        public int id { get; set; }
        public string number { get; set; }
        public string name { get; set; }
        public int idschool { get; set; }
    }
}
