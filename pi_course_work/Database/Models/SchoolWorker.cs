using System;

namespace pi_course_work.Database.Models
{
    public class SchoolWorker
    {
        public SchoolWorker() { }

        public SchoolWorker(int id, string position, DateTime joindate, int idpersonaldata)
        {
            this.id = id;
            this.position = position;
            this.joindate = joindate;
            this.idpersonaldata = idpersonaldata;
        }

        public int id { get; set; }
        public string position { get; set; }
        public DateTime joindate { get; set; }
        public int idpersonaldata { get; set; }
    }
}
