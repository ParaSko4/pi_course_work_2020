using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class AuditoriumsRepository : IAuditoriumRepository
    {
        private SchoolCRMContext db;

        public AuditoriumsRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Auditorium item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Auditorium Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Auditorium> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Auditorium item)
        {
            throw new NotImplementedException();
        }
    }
}
