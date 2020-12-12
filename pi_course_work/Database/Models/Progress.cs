namespace pi_course_work.Database.Models
{
    public class Progress
    {
        public Progress() { }

        public Progress(int id, int idstudent, int idlesson, int idteacher, int mark)
        {
            this.id = id;
            this.idstudent = idstudent;
            this.idlesson = idlesson;
            this.idteacher = idteacher;
            this.mark = mark;
        }

        public int id { get; set; }
        public int idstudent { get; set; }
        public int idlesson { get; set; }
        public int idteacher { get; set; }
        public int mark { get; set; }
    }
}