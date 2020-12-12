using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IProgressRepository
    {
        List<Progress> GetAll(int schoolId);
        List<Progress> GetStudent(int personalId);
        List<Progress> GetTeacher(int workerId);
        void Add(Progress progress);
        void Update(int id, int mark);
        void Delete(int id);
    }
}