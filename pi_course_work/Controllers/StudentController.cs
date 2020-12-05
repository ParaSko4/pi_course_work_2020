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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private IUnitOfWork db;

        public StudentController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetClassStudents")]
        public string GetClassStudents(int classId)
        {
            try
            {
                var students = db.Students.GetAll(classId);

                return JsonConvert.SerializeObject(new
                {
                    students,
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
        [HttpPost("AddStudent")]
        public RequestResult Post([FromBody] StudentAdd student)
        {
            ClaimsIdentity ident = HttpContext.User.Identity as ClaimsIdentity;
            try
            {
                student.schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());

                db.Students.Add(student);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
