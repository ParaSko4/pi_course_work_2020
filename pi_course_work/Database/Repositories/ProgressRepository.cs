using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories
{
    public class ProgressRepository : IProgressRepository
    {
        private SchoolCRMContext db;

        public ProgressRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Progress progress)
        {
            db.LoadStoredProc("put_student_mark")
               .AddParam("teacherId", progress.idteacher)
               .AddParam("lessonId", progress.idlesson)
               .AddParam("studentId", progress.idstudent)
               .AddParam("mark", progress.mark)
               .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_student_mark")
               .AddParam("markId", id)
               .ExecNonQuery();
        }

        public List<Progress> GetAll(int schoolId)
        {
            List<Progress> marks = null;

            db.LoadStoredProc("get_marks")
               .AddParam("schoolId", schoolId)
               .Exec(r => marks = r.ToList<Progress>());

            return marks;
        }

        public List<Progress> GetStudent(int personalId)
        {
            List<Progress> marks = null;

            db.LoadStoredProc("get_student_marks")
                .AddParam("personalId", personalId)
                .Exec(r => marks = r.ToList<Progress>());

            return marks;
        }

        public List<Progress> GetTeacher(int workerId)
        {
            List<Progress> marks = null;

            db.LoadStoredProc("get_worker_marks")
                .AddParam("workerId", workerId)
                .Exec(r => marks = r.ToList<Progress>());

            return marks;
        }

        public void Update(int id, int mark)
        {
            db.LoadStoredProc("update_student_mark")
               .AddParam("markId", id)
               .AddParam("newMark", mark)
               .ExecNonQuery();
        }
    }
}
