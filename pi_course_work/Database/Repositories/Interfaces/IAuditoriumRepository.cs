using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IAuditoriumRepository
    {
        List<Auditorium> GetAll(int schoolId);
        void Add(Auditorium auditorium);
        void Update(Auditorium auditorium);
        void Delete(int id);
        void DeleteAll(int schoolId);
    }
}
