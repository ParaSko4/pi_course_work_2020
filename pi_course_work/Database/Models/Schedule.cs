namespace pi_course_work.Database.Models
{
    public class Schedule
    {
        public Schedule() { }

        public Schedule(int idclass, int idteacher, int idtime, int idauditorium, int idlesson)
        {
            this.idclass = idclass;
            this.idteacher = idteacher;
            this.idtime = idtime;
            this.idauditorium = idauditorium;
            this.idlesson = idlesson;
        }

        public int idclass { get; set; }
        public int idteacher { get; set; }
        public int idtime { get; set; }
        public int idauditorium { get; set; }
        public int idlesson { get; set; }
    }
}
