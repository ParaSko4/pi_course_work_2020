using pi_course_work.Database.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public class SchoolImgRepository : ISchoolImgRepository
    {
        private SchoolCRMContext db;

        public SchoolImgRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(ISchoolImgRepository item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ISchoolImgRepository Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ISchoolImgRepository> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(ISchoolImgRepository item)
        {
            throw new NotImplementedException();
        }
    }
}
