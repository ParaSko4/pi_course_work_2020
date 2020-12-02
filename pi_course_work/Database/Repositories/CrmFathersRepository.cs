using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace pi_course_work.Database.Repositories
{
    public class CrmFathersRepository : ICRMFathersRepository
    {
        private SchoolCRMContext db;

        public CrmFathersRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public int Add(CRMFather newFather)
        {
            db.LoadStoredProc("add_crm_father")
               .AddParam("father", newFather.father)
               .AddParam("password", newFather.password)
               .AddParam("idFather", out IOutParam<int> idFather)
               .ExecNonQuery();

            return idFather.Value;
        }

        public CRMFather GetFather(string login, string password)
        {
            return db.crmFathers.FirstOrDefault(f => f.father == login && f.password == password);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public CRMFather Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CRMFather> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(CRMFather item)
        {
            throw new NotImplementedException();
        }

        void IRepositoryBase<CRMFather>.Add(CRMFather item)
        {
            throw new NotImplementedException();
        }

        public bool isExist(string login)
        {
            db.LoadStoredProc("check_crm_father")
                   .AddParam("login", login)
                   .AddParam("isExist", out IOutParam<int> i)
                   .ExecNonQuery();

            return Convert.ToBoolean(i.Value);
        }

        public bool canLogin(CRMFather father, out int fatherId)
        {
            db.LoadStoredProc("login_crm_father")
                   .AddParam("login", father.father)
                   .AddParam("password", father.password)
                   .AddParam("isExist", out IOutParam<int> i)
                   .AddParam("fatherId", out IOutParam<int> outId)
                   .ExecNonQuery();
            try
            {
                fatherId = outId.Value;
            }
            catch (Exception)
            {
                fatherId = -1;
                return false;
            }

            return Convert.ToBoolean(i.Value);
        }
    }
}
