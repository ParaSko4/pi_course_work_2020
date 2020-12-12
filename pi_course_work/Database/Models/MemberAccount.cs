namespace pi_course_work.Database.Models
{
    public class MemberAccount
    {
        public MemberAccount() { }

        public MemberAccount(int id, string login, string password, string role)
        {
            this.id = id;
            this.login = login;
            this.password = password;
            this.role = role;
        }

        public int id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string role { get; set; }
    }
}