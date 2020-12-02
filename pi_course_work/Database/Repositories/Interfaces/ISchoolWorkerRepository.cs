using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ISchoolWorkerRepository
    {
        List<WorkerData> GetAll(int schoolId);
        SchoolWorker Get(int id);
        void Add(NewWorker worker);
        void Update(UpdateWorker item);
        void Delete(int id);
    }
}