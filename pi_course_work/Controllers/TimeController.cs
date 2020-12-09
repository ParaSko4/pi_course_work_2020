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
using System.Security.Claims;
using System.Threading.Tasks;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        private IUnitOfWork db;

        public TimeController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetTimes")]
        public string GetTimes()
        {
            try
            {
                int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());
                var times = db.SchoolTime.GetAll(schoolId);

                return JsonConvert.SerializeObject(new
                {
                    times,
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
        [HttpPost("AddTime")]
        public RequestResult AddTime([FromBody] SchoolTime time)
        {
            try
            {
                time.idschool = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());

                db.SchoolTime.Add(time);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpPut("UpdateTime")]
        public RequestResult Put([FromBody] SchoolTime time)
        {
            try
            {
                db.SchoolTime.Update(time);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveTime")]
        public RequestResult Delete(int id)
        {
            try
            {
                db.SchoolTime.Delete(id);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveAllTimes")]
        public RequestResult DeleteAll()
        {
            try
            {
                db.SchoolTime.Delete(Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault()));
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
    }
}
