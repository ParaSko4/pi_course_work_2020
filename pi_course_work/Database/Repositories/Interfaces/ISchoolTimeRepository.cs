using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ISchoolTimeRepository
    {
        List<SchoolTime> GetAll(int schoolId);
        void Add(SchoolTime item);
        void Update(SchoolTime item);
        void Delete(int id);
        void DeleteAll(int schoolId);
    }
}
