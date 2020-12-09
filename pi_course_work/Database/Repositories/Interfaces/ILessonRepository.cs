using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ILessonRepository
    {
        List<Lesson> GetAll(int schoolId);
        void Add(Lesson lesson);
        void Update(Lesson lesson);
        void Delete(int id);
        void DeleteAll(int schoolId);
    }
}
