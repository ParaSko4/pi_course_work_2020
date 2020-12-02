namespace pi_course_work.Database.Models
{
    public class SchoolImg
    {
        public SchoolImg() { }
        public SchoolImg(int id, string path, string tag)
        {
            this.id = id;
            this.path = path;
            this.tag = tag;
        }

        public int id { get; set; }
        public string path { get; set; }
        public string tag { get; set; }
    }
}
