using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
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

        public MemberAccount Get(int id)
        {
            MemberAccount acc = null;

            db.LoadStoredProc("get_memberaccount")
                .AddParam("userId", id)
                .Exec(r => acc = r.FirstOrDefault<MemberAccount>());

            return acc;
        }

        public bool isLogin(string login, string password, out int id)
        {
            db.LoadStoredProc("login_school_member")
                .AddParam("login", login)
                .AddParam("password", password)
                .AddParam("id", out IOutParam<int> outId)
                .AddParam("isExist", out IOutParam<bool> outIsExist)
                .ExecNonQuery();

            bool isExist = Convert.ToBoolean(outIsExist.Value);
            id = isExist ? outId.Value : -1;

            return isExist;
        }
    }
}