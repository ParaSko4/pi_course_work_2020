using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class SchoolsRepository : ISchoolRepository
    {
        private SchoolCRMContext db;

        public SchoolsRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(School item)
        {
            db.LoadStoredProc("add_school")
               .AddParam("idFather", item.idfather)
               .AddParam("name", item.name)
               .AddParam("location", item.location)
               .ExecNonQuery();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public School Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<School> GetAll()
        {
            throw new NotImplementedException();
        }

        public int GetSchoolId(int fatherId)
        {
            db.LoadStoredProc("get_schoolid_by_fatherid")
               .AddParam("fatherId", fatherId)
               .AddParam("schoolId", out IOutParam<int> i)
               .ExecNonQuery();

            return i.Value;
        }

        public bool isExist(string school)
        {
            db.LoadStoredProc("check_school")
                   .AddParam("name", school)
                   .AddParam("isExist", out IOutParam<int> i)
                   .ExecNonQuery();

            return Convert.ToBoolean(i.Value);
        }

        public void Update(School item)
        {
            throw new NotImplementedException();
        }
    }
}
