using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using pi_course_work.HttpModels;
using pi_course_work.StaticFields;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private IUnitOfWork db;

        public ScheduleController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetSchedule")]
        public string GetSchedule(int classId)
        {
            try
            {
                var schedules = db.Schedules.GetClass(classId);

                return JsonConvert.SerializeObject(new
                {
                    schedules,
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

        [Authorize]
        [HttpGet("GetAllSchedules")]
        public string GetAllSchedules()
        {
            try
            {
                var schedules = db.Schedules.GetAll(Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault()));

                return JsonConvert.SerializeObject(new
                {
                    schedules,
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

        [Authorize]
        [HttpPost("AddSchedule")]
        public RequestResult AddSchedule([FromBody] List<Schedule> schedules)
        {
            try
            {
                foreach (var schedule in schedules)
                {
                    db.Schedules.Add(schedule);
                }
                
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpPut("UpdateSchedule")]
        public RequestResult UpdateSchedule([FromBody] List<Schedule> schedules)
        {
            Debug.WriteLine(JsonConvert.SerializeObject(schedules));
            try
            {
                var existSchedulesDay = db.Schedules.GetClass(schedules[0].idclass).Where(sch => sch.day == schedules[0].day).ToList();

                foreach (var schedule in existSchedulesDay)
                {
                    if (!schedules.Any(sch => sch.idtime == schedule.idtime && sch.id != 0))
                    {
                        db.Schedules.Delete(schedule.id);
                    }
                }

                foreach (var schedule in schedules)
                {
                    if (existSchedulesDay.Any(exSchedule => exSchedule.id == schedule.id))
                    {
                        db.Schedules.Update(schedule);
                    }
                    else
                    {
                        db.Schedules.Add(schedule);
                    }
                }

                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveScheduleDay")]
        public RequestResult RemoveSchedule(int classId, int day)
        {
            try
            {
                db.Schedules.DeleteDay(classId, day);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpGet("GetStudentSchedules")]
        public string GetStudentSchedules()
        {
            try
            {
                var schedules = db.Schedules.GetStudentSchedule(Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()));

                return JsonConvert.SerializeObject(new
                {
                    schedules,
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
