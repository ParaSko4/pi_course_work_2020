namespace pi_course_work.HttpModels
{
    public class SignInData
    {
        public SignInData() { }

        public SignInData(string login, string password)
        {
            this.login = login;
            this.password = password;
        }

        public string login { get; set; }
        public string password { get; set; }
    }
}
