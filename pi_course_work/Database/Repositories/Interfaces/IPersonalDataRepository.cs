using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IPersonalRepositry : IRepositoryBase<PersonalData>
    {
        void Add(PersonalData item, string role);
    }
}
