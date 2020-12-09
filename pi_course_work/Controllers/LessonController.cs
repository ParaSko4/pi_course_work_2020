using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using pi_course_work.HttpModels;
using pi_course_work.StaticFields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private IUnitOfWork db;

        public LessonController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetLessons")]
        public string GetAll()
        {
            try
            {
                int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());
                var lessons = db.Lessons.GetAll(schoolId);

                return JsonConvert.SerializeObject(new
                {
                    lessons,
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
        [HttpPost("AddLesson")]
        public RequestResult Post([FromBody] Lesson lesson)
        {
            try
            {
                lesson.idschool = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());

                db.Lessons.Add(lesson);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpPut("UpdateLesson")]
        public RequestResult Put([FromBody] Lesson lesson)
        {
            try
            {
                db.Lessons.Update(lesson);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveLesson")]
        public RequestResult Delete(int id)
        {
            try
            {
                db.Lessons.Delete(id);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveAllLesson")]
        public RequestResult DeleteAll()
        {
            try
            {
                db.Lessons.DeleteAll(Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault()));
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
    }
}
