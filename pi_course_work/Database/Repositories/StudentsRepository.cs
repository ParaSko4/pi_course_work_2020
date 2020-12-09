using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using pi_course_work.StaticFields;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories
{
    public class StudentsRepository : IStudentRepository
    {
        private SchoolCRMContext db;

        public StudentsRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(StudentAdd student)
        {
            db.LoadStoredProc("add_student")
               .AddParam("schoolId", student.schoolId)
               .AddParam("classId", student.classId)
               .AddParam("name", student.name)
               .AddParam("surname", student.surname)
               .AddParam("middlename", student.middlename)
               .AddParam("birthday", student.birthday)
               .AddParam("residence", student.residence)
               .AddParam("number", student.number)
               .AddParam("sex", student.sex)
               .AddParam("role", Roles.STUDENT_ROLE)
               .ExecNonQuery();
        }

        public void Delete(int personalDataId)
        {
            db.LoadStoredProc("remove_student")
               .AddParam("personalDataId", personalDataId)
               .ExecNonQuery();
        }

        public Student Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<StudentData> GetAll(int classId)
        {
            List<StudentData> rows = null;

            db.LoadStoredProc("get_class_students")
               .AddParam("classId", classId)
               .Exec(r => rows = r.ToList<StudentData>());

            return rows;
        }

        public void Update(StudentUpdate student)
        {
            db.LoadStoredProc("update_student")
                .AddParam("personalDataId", student.personalDataId)
                .AddParam("name", student.name)
                .AddParam("surname", student.surname)
                .AddParam("middleName", student.middlename)
                .AddParam("birthday", student.birthday)
                .AddParam("residence", student.residence)
                .AddParam("number", student.number)
                .AddParam("sex", student.sex)
                .AddParam("login", student.login)
                .AddParam("password", student.password)
                .ExecNonQuery();
        }
    }
}
