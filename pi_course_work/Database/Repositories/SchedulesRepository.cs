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
    public class SchedulesRepository : IScheduleRepository
    {
        private SchoolCRMContext db;

        public SchedulesRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Schedule schedule)
        {
            db.LoadStoredProc("add_schedule")
               .AddParam("classId", schedule.idclass)
               .AddParam("lessonId", schedule.idlesson)
               .AddParam("timeId", schedule.idtime)
               .AddParam("teacherId", schedule.idteacher)
               .AddParam("auditoriumId", schedule.idauditorium)
               .AddParam("day", schedule.day)
               .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_schedule")
               .AddParam("scheduleId", id)
               .ExecNonQuery();
        }

        public void DeleteDay(int classId, int day)
        {
            db.LoadStoredProc("remove_schedule_day")
               .AddParam("classId", classId)
               .AddParam("day", day)
               .ExecNonQuery();
        }

        public List<Schedule> GetAll(int schoolId)
        {
            List<Schedule> schedules = null;

            db.LoadStoredProc("get_all_schedules")
               .AddParam("schoolId", schoolId)
               .Exec(r => schedules = r.ToList<Schedule>());

            return schedules;
        }

        public List<Schedule> GetClass(int classId)
        {
            List<Schedule> schedules = null;

            db.LoadStoredProc("get_schedules")
               .AddParam("classId", classId)
               .Exec(r => schedules = r.ToList<Schedule>());

            return schedules;
        }

        public List<Schedule> GetStudentSchedule(int personalDataId)
        {
            List<Schedule> schedules = null;

            db.LoadStoredProc("get_student_schedule")
               .AddParam("personalDataId", personalDataId)
               .Exec(r => schedules = r.ToList<Schedule>());

            return schedules;
        }

        public List<Schedule> GetTeacherSchedule(int personalDataId)
        {
            List<Schedule> schedules = null;

            db.LoadStoredProc("get_worker_schedule")
               .AddParam("workerId", personalDataId)
               .Exec(r => schedules = r.ToList<Schedule>());

            return schedules;
        }

        public void Update(Schedule schedule)
        {
            db.LoadStoredProc("udpate_schedule")
               .AddParam("scheduleId", schedule.id)
               .AddParam("lessonId", schedule.idlesson)
               .AddParam("timeId", schedule.idtime)
               .AddParam("teacherId", schedule.idteacher)
               .AddParam("auditoriumId", schedule.idauditorium)
               .AddParam("day", schedule.day)
               .ExecNonQuery();
        }
    }
}
