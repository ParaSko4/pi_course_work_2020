namespace pi_course_work.Database.Models
{
    public class PersonalImg
    {
        public PersonalImg() { }

        public PersonalImg(int id, string path)
        {
            this.id = id;
            this.path = path;
        }

        public int id { get; set; }
        public string path { get; set; }
    }
}
