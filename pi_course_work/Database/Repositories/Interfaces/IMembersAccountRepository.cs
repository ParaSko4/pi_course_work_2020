using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IMembersAccountRepository : IRepositoryBase<MemberAccount>
    {
        MemberAccount GetAccount(string login, string password);
    }
}
