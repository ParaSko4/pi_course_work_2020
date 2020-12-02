namespace pi_course_work.Database.Models
{
    public class School
    {
        public School() { }

        public School(int id, int idfather, string name, string location)
        {
            this.id = id;
            this.idfather = idfather;
            this.name = name;
            this.location = location;
        }

        public School(int idfather, string name, string location)
        {
            this.idfather = idfather;
            this.name = name;
            this.location = location;
        }

        public int id { get; set; }
        public int idfather { get; set; }
        public string name { get; set; }
        public string location { get; set; }
    }
}
