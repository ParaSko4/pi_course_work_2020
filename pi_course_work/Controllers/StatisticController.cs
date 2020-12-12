using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pi_course_work.Database.Repositories.Interfaces;
using pi_course_work.StaticFields;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private IUnitOfWork db;

        public StatisticController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetStat")]
        public string GetStudentMarks()
        {
            try
            {
                int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());

                int bestStudentId = -1;
                int worthlessStudentId = -1;

                int marksSum = 0;
                int maxMarkSum = 0;
                int minMarkSum = 1000;

                int bestClassId = 0;
                int worthlessClassId = 0;

                int classMarksSum = 0;
                int minClassMarksSum = 1000;
                int maxClassMarksSum = 0;

                foreach (var schoolClass in db.Classes.GetAll(schoolId))
                {
                    foreach (var student in db.Students.GetAll(schoolClass.id))
                    {
                        foreach (var mark in db.Progress.GetStudent(student.personalDataId))
                        {
                            marksSum += mark.mark;
                        }

                        if (maxMarkSum < marksSum)
                        {
                            maxMarkSum = marksSum;
                            bestStudentId = student.personalDataId;
                        }
                        else if (minMarkSum > marksSum)
                        {
                            minMarkSum = marksSum;
                            worthlessStudentId = student.personalDataId;
                        }

                        classMarksSum += marksSum;
                        marksSum = 0;
                    }

                    if (maxClassMarksSum < classMarksSum)
                    {
                        maxClassMarksSum = classMarksSum;
                        bestClassId = schoolClass.id;
                    }
                    else if (minClassMarksSum > classMarksSum)
                    {
                        minClassMarksSum = classMarksSum;
                        worthlessClassId = schoolClass.id;
                    }

                    maxMarkSum = 0;
                    minMarkSum = 0;
                    classMarksSum = 0;
                }

                int bestWorkerId = 0;
                int worthlessWorkerId = 0;

                int scheduleCount = 0;
                int maxScheduleCount = 0;
                int minScheduleCount = 1000;

                foreach (var worker in db.SchoolWorkers.GetAll(schoolId))
                {
                    scheduleCount = db.Schedules.GetTeacherSchedule(worker.personalDataId).Count;

                    if (maxScheduleCount < scheduleCount)
                    {
                        maxScheduleCount = scheduleCount;
                        bestWorkerId = worker.personalDataId;
                    }
                    else if (minScheduleCount > scheduleCount)
                    {
                        minScheduleCount = scheduleCount;
                        worthlessWorkerId = worker.personalDataId;
                    }
                }

                var days = new Dictionary<int, int>();

                foreach (var schedule in db.Schedules.GetAll(schoolId))
                {
                    if (days.ContainsKey(schedule.day))
                    {
                        days[schedule.day] += 1;
                    }
                    else
                    {
                        days.Add(schedule.day, 0);
                    }
                }

                return JsonConvert.SerializeObject(new
                {
                    statistic = new
                    {
                        bestWorker = db.SchoolWorkers.Get(bestWorkerId),
                        worthlessWorker = db.SchoolWorkers.Get(worthlessWorkerId),
                        bestClass = db.Classes.Get(bestClassId),
                        worthlessClass = db.Classes.Get(worthlessClassId),
                        bestStudent = db.Students.Get(bestStudentId),
                        worthlessStudent = db.Students.Get(worthlessStudentId),
                        bestDay = days.Max(dic => dic.Value),
                        easyDay = days.Min(dic => dic.Value)
                    },
                    HttpResults.successRequest.result,
                    HttpResults.successRequest.error
                });
            }
            catch (Exception)
            {
                return JsonConvert.SerializeObject(new
                {
                    HttpResults.badRequest.error,
                    HttpResults.badRequest.result
                });
            }
        }
    }
}
