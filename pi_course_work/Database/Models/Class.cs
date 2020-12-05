namespace pi_course_work.Database.Models
{
    public class Class
    {
        public Class() { }

        public Class(int id, string letter, int number, int idteacher)
        {
            this.id = id;
            this.letter = letter;
            this.number = number;
            this.idteacher = idteacher;
        }

        public int id { get; set; }
        public string letter { get; set; }
        public int number { get; set; }
        public int idteacher { get; set; }
    }
}
