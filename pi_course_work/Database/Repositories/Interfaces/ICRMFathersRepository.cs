using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ICRMFathersRepository: IRepositoryBase<CRMFather>
    {
        CRMFather GetFather(string login, string password);
        new int Add(CRMFather newFather);

        bool canLogin(CRMFather father, out int fatherId);
        bool isExist(string login);
    }
}
