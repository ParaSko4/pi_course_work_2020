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
    public class ClassesRepository : IClassRepository
    {
        private SchoolCRMContext db;

        public ClassesRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Class newClass)
        {
            db.LoadStoredProc("add_class")
                .AddParam("letter", newClass.letter)
                .AddParam("number", newClass.number)
                .AddParam("idteacher", newClass.idteacher)
                .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_class")
                .AddParam("classId", id)
                .ExecNonQuery();
        }

        public Class Get(int id)
        {
            Class schoolClass = null;

            db.LoadStoredProc("get_class_by_id")
                .AddParam("classId", id)
                .Exec(r => schoolClass = r.FirstOrDefault<Class>());

            return schoolClass;
        }

        public List<Class> GetAll(int schoolId)
        {
            List<Class> rows = null;

            db.LoadStoredProc("get_classes")
               .AddParam("schoolId", schoolId)
               .Exec(r => rows = r.ToList<Class>());

            return rows;
        }

        public bool isExist(Class checkClass, int schoolId)
        {
            db.LoadStoredProc("check_class")
                .AddParam("letter", checkClass.letter)
                .AddParam("number", checkClass.number)
                .AddParam("idteacher", checkClass.idteacher)
                .AddParam("schoolId", schoolId)
                .AddParam("isExist", out IOutParam<int> i)
                .ExecNonQuery();

            return Convert.ToBoolean(i.Value);
        }

        public void Update(Class item)
        {
            db.LoadStoredProc("update_class")
                .AddParam("classId", item.id)
                .AddParam("letter", item.letter)
                .AddParam("number", item.number)
                .AddParam("teacherId", item.idteacher)
                .ExecNonQuery();
        }
    }
}
