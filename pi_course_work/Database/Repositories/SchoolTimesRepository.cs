using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class SchoolTimesRepository : ISchoolTimeRepository
    {
        private SchoolCRMContext db;

        public SchoolTimesRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(SchoolTime item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public SchoolTime Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<SchoolTime> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(SchoolTime item)
        {
            throw new NotImplementedException();
        }
    }
}
