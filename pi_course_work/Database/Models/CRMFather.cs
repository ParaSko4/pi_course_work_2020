namespace pi_course_work.Database.Models
{
    public class CRMFather
    {
        public CRMFather() { }

        public CRMFather(int id, string father, string password)
        {
            this.id = id;
            this.father = father;
            this.password = password;
        }

        public CRMFather(string father, string password)
        {
            this.father = father;
            this.password = password;
        }

        public int id { get; set; }
        public string father { get; set; }
        public string password { get; set; }

    }
}
