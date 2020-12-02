namespace pi_course_work.Database.Models
{
    public class Auditorium
    {
        public Auditorium() { }

        public Auditorium(int id, string number, string name)
        {
            this.id = id;
            this.number = number;
            this.name = name;
        }

        public int id { get; set; }
        public string number { get; set; }
        public string name { get; set; }
    }
}
