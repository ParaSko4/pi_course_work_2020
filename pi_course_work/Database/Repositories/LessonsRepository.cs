using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
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

        public void Add(Lesson lesson)
        {
            db.LoadStoredProc("add_lesson")
                .AddParam("schoolId", lesson.idschool)
                .AddParam("name", lesson.name)
                .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_lesson")
                .AddParam("id", id)
                .ExecNonQuery();
        }

        public void DeleteAll(int schoolId)
        {
            db.LoadStoredProc("remove_all_lessons")
                .AddParam("schoolId", schoolId)
                .ExecNonQuery();
        }

        public List<Lesson> GetAll(int schoolId)
        {
            List<Lesson> lessons = null;

            db.LoadStoredProc("get_lessons")
                .AddParam("schoolId", schoolId)
                .Exec(r => lessons = r.ToList<Lesson>());

            return lessons;
        }

        public void Update(Lesson lesson)
        {
            db.LoadStoredProc("update_lesson")
                .AddParam("lessonId", lesson.id)
                .AddParam("name", lesson.name)
                .ExecNonQuery();
        }
    }
}
