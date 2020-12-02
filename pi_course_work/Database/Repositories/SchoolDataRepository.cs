using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class SchoolDataRepository : ISchoolDataRepository
    {
        public List<WorkerData> GetAllWorkers(int schoolId)
        {
            throw new NotImplementedException();
        }
    }
}
