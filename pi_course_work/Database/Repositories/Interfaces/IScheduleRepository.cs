using pi_course_work.Database.Models;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IScheduleRepository
    {
        List<Schedule> GetAll(int schoolId);
        List<Schedule> GetClass(int classId);
        List<Schedule> GetTeacherSchedule(int personalDataId);
        List<Schedule> GetStudentSchedule(int personalDataId);
        void Add(Schedule schedule);
        void Update(Schedule schedule);
        void Delete(int id);
        void DeleteDay(int classId, int day);
    }
}