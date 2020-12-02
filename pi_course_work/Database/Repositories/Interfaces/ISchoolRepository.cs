using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ISchoolRepository: IRepositoryBase<School>
    {
        int GetSchoolId(int fatherId);
        bool isExist(string school);
    }
}
