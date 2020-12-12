using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IMembersAccountRepository
    {
        MemberAccount Get(int id);
        bool isLogin(string login, string password, out int id);
    }
}