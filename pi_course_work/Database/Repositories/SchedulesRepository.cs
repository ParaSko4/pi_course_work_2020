using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class SchedulesRepository : IScheduleRepository
    {
        private SchoolCRMContext db;

        public SchedulesRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Schedule item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Schedule Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Schedule> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Schedule item)
        {
            throw new NotImplementedException();
        }
    }
}
