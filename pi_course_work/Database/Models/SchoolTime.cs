namespace pi_course_work.Database.Models
{
    public class SchoolTime
    {
        public SchoolTime() { }

        public SchoolTime(int id, string period, string dayhalf, int idschool)
        {
            this.id = id;
            this.period = period;
            this.dayhalf = dayhalf;
            this.idschool = idschool;
        }

        public int id { get; set; }
        public string period { get; set; }
        public string dayhalf { get; set; }
        public int idschool { get; set; }
    }
}
