using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ICRMFathersRepository
    {
        int Add(CRMFather newFather);
        void Update(CRMFather item);
        void Delete(int id);

        bool canLogin(CRMFather father, out int fatherId);
        bool isExist(string login);
    }
}
