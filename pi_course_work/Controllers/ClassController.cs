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
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private IUnitOfWork db;

        public ClassController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("ClassesData")]
        public string AddClass()
        {
            ClaimsIdentity ident = HttpContext.User.Identity as ClaimsIdentity;
            try
            {
                int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());
                var classes = db.Classes.GetAll(schoolId);

                return JsonConvert.SerializeObject(new
                {
                    classes,
                    HttpResults.successRequest.result,
                    HttpResults.successRequest.error
                });
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new
                {
                    HttpResults.badRequest.error,
                    HttpResults.badRequest.result
                });
            }
        }

        [Authorize]
        [HttpGet("ClassById")]
        public string GetClassById(int id)
        {
            try
            {
                var schoolClass = db.Classes.Get(id);

                return JsonConvert.SerializeObject(new
                {
                    schoolClass,
                    HttpResults.successRequest.result,
                    HttpResults.successRequest.error
                });
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new
                {
                    HttpResults.badRequest.error,
                    HttpResults.badRequest.result
                });
            }
        }

        [Authorize]
        [HttpPost("AddClass")]
        public RequestResult AddClass([FromBody] Class newClass)
        {
            ClaimsIdentity ident = HttpContext.User.Identity as ClaimsIdentity;
            int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());

            if (!db.Classes.isExist(newClass, schoolId))
            {
                return HttpResults.badClassRequest;
            }

            try
            {
                db.Classes.Add(newClass);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }            
        }

        [Authorize]
        [HttpDelete("RemoveClass")]
        public RequestResult RemoveClass(int id)
        {
            try
            {
                db.Classes.Delete(id);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
    }
}
