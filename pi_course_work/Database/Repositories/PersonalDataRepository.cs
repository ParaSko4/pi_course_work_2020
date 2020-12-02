using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;

namespace pi_course_work.Database.Repositories
{
    public class PersonalDataRepository : IPersonalRepositry
    {
        private SchoolCRMContext db;

        public PersonalDataRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(PersonalData item, string role)
        {
            db.LoadStoredProc("add_personedata")
               .AddParam("name", item.name)
               .AddParam("surname", item.surname)
               .AddParam("middlename", item.middlename)
               .AddParam("birthday", item.birthday)
               .AddParam("residence", item.residence)
               .AddParam("number", item.number)
               .AddParam("sex", item.sex)
               .AddParam("role", role)
               .AddParam("joindate", item.joindate)
               .AddParam("personeid", out IOutParam<int> i)
               .ExecNonQuery();
        }

        public void Add(PersonalData item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            var item = db.personalData.Find(id);
            if (item != null)
            {
                db.personalData.Remove(item);
            }
        }

        public PersonalData Get(int id)
        {
            return db.personalData.Find(id);
        }

        public IEnumerable<PersonalData> GetAll()
        {
            return db.personalData.ToList();
        }

        public void Update(PersonalData item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}
