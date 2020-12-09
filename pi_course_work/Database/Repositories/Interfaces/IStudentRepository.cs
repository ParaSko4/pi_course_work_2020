using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IStudentRepository
    {
        List<StudentData> GetAll(int classId);
        Student Get(int id);
        void Add(StudentAdd item);
        void Update(StudentUpdate item);
        void Delete(int personalDataId);
    }
}
