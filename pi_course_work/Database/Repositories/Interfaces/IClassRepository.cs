using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IClassRepository
    {
        List<Class> GetAll(int schoolId);
        Class Get(int id);
        void Add(Class item);
        void Update(Class item);
        void Delete(int id);
        bool isExist(Class checkClass, int schoolId);
    }
}
