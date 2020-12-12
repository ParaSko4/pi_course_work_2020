using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pi_course_work.Database.Repositories.Interfaces;
using pi_course_work.StaticFields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private IUnitOfWork db;

        public ProgressController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("GetStudentMarks")]
        public string GetStudentMarks()
        {
            try
            {
                var marks = db.Progress.GetStudent(Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()));

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
    }
}
