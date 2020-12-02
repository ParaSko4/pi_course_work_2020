using System;

namespace pi_course_work.Database.Models
{
    public class Progress
    {
        public Progress() { }

        public Progress(int idstudent, int idlesson, int idteacher, DateTime? timing)
        {
            this.idstudent = idstudent;
            this.idlesson = idlesson;
            this.idteacher = idteacher;
            this.timing = timing;
        }

        public int idstudent { get; set; }
        public int idlesson { get; set; }
        public int idteacher { get; set; }
        public DateTime? timing { get; set; }
    }
}
