namespace pi_course_work.Database.Models
{
    public class Lesson
    {
        public Lesson() { }

        public Lesson(int id, string name)
        {
            this.id = id;
            this.name = name;
        }

        public int id { get; set; }
        public string name { get; set; }

    }
}
