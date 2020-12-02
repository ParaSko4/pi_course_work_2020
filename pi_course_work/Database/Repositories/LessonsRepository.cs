using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class LessonsRepository : ILessonRepository
    {
        private SchoolCRMContext db;

        public LessonsRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Lesson item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Lesson Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Lesson> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Lesson item)
        {
            throw new NotImplementedException();
        }
    }
}
