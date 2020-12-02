using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class ProgressRepository : IProgressRepository
    {
        private SchoolCRMContext db;

        public ProgressRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Progress item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Progress Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Progress> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Progress item)
        {
            throw new NotImplementedException();
        }
    }
}
