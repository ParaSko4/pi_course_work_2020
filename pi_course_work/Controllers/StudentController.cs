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
using System.Security.Claims;
using System.Threading.Tasks;

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
        [HttpPost("AddStudent")]
        public RequestResult Post([FromBody] StudentAdd student)
        {
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

        [Authorize]
        [HttpPut("UpdateStudent")]
        public RequestResult UpdateStudent(StudentUpdate student)
        {   
            try
            {
                db.Students.Update(student);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveStudent")]
        public RequestResult Delete(int personalDataId)
        {
            try
            {
                db.Students.Delete(personalDataId);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
        
        [Authorize]
        [HttpGet("GetStudent")]
        public string GetStudent()
        {
            try
            {
                var personalData = db.Students.Get(Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()));

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
    }
}
