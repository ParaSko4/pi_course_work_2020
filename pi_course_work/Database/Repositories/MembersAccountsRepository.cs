using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace pi_course_work.Database.Repositories
{
    public class MembersAccountsRepository : IMembersAccountRepository
    {
        private SchoolCRMContext db;

        public MembersAccountsRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(MemberAccount item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public MemberAccount Get(int id)
        {
            throw new NotImplementedException();
        }

        public MemberAccount GetAccount(string login, string password)
        {
            return null;
        }

        public IEnumerable<MemberAccount> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(MemberAccount item)
        {
            throw new NotImplementedException();
        }
    }
}
