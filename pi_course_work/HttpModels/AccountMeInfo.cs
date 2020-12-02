namespace pi_course_work.HttpModels
{
    public class AccountMeInfo
    {
        public AccountMeInfo() { }

        public AccountMeInfo(int userId, string name, string role, int schoolId)
        {
            this.userId = userId;
            this.name = name;
            this.role = role;
            this.schoolId = schoolId;
        }

        public int userId { get; set; }
        public string name { get; set; }
        public string role { get; set; }
        public int schoolId { get; set; }
    }
}
