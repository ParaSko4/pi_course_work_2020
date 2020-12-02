using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class ClassesRepository : IClassRepository
    {
        private SchoolCRMContext db;

        public ClassesRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Class item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Class Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Class> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Class item)
        {
            throw new NotImplementedException();
        }
    }
}
