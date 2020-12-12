using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class TeacherController : ControllerBase
    {
        private IUnitOfWork db;

        public TeacherController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetPersonalData")]
        public string GetPersonalData()
        {
            try
            {
                var personalData = db.SchoolWorkers.Get(Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()));

                return JsonConvert.SerializeObject(new
                {
                    personalData,
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
        [HttpGet("GetSchedule")]
        public string GetSchedule()
        {
            try
            {
                var schedules = db.Schedules.GetTeacherSchedule(Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()));

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
        [HttpGet("GetMarks")]
        public string GetMarks()
        {
            try
            {
                var marks = db.Progress.GetTeacher(Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()));

                return JsonConvert.SerializeObject(new
                {
                    marks,
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
        [HttpPost("AddMark")]
        public RequestResult AddMark([FromBody] Progress progress)
        {
            try
            {
                db.Progress.Add(progress);

                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
        
        [Authorize]
        [HttpPut("UpdateMark")]
        public RequestResult UpdateMark(int markId, int mark)
        {
            try
            {
                db.Progress.Update(markId, mark);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
        
        [Authorize]
        [HttpDelete("DeleteMark")]
        public RequestResult DeleteMark(int markId)
        {
            try
            {
                db.Progress.Delete(markId);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
    }
}