using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ISchoolDataRepository
    {
        List<WorkerData> GetAllWorkers(int schoolId);
    }
}
