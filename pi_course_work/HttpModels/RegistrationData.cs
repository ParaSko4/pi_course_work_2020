namespace pi_course_work.HttpModels
{
    public class RegistrationData
    {
        public RegistrationData() { }
        public RegistrationData(string login, string password, string schoolName, string location)
        {
            this.login = login;
            this.password = password;
            this.schoolName = schoolName;
            this.location = location;
        }

        public string login { get; set; }
        public string password { get; set; }
        public string schoolName { get; set; }
        public string location { get; set; }
    }
}
