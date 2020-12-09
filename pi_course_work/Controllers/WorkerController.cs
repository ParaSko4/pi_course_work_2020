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
    public class WorkerController : ControllerBase
    {
        private IUnitOfWork db;

        public WorkerController(IUnitOfWork context)
        {
            this.db = context;
        }

        [Authorize]
        [HttpGet("WorkersData")]
        public string GetAllWorkers()
        {
            try
            {
                int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());
                var workers = db.SchoolWorkers.GetAll(schoolId);

                return JsonConvert.SerializeObject(new
                {
                    workers,
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
        [HttpGet("WorkersWithoutClass")]
        public string GetAllWorkersWithoutClass()
        {
            try
            {
                int schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());
                var workers = db.SchoolWorkers.GetAllWithoutClass(schoolId);

                return JsonConvert.SerializeObject(new
                {
                    workers,
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
        [HttpGet("ClassWorkerByClass")]
        public string GetClassWorkerByClass(int classId)
        {
            try
            {
                var classWorker = db.SchoolWorkers.GetByClassId(classId);

                return JsonConvert.SerializeObject(new
                {
                    classWorker,
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
        [HttpPost("NewWorker")]
        public RequestResult Post([FromBody] NewWorker newWorker)
        {
            try
            {
                newWorker.schoolId = Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault());

                db.SchoolWorkers.Add(newWorker);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpDelete("RemoveWorker")]
        public RequestResult RemoveWorker(int id)
        {
            try
            {
                db.SchoolWorkers.Delete(id);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }

        [Authorize]
        [HttpPut("UpdateWorker")]
        public RequestResult UpdateWorker(UpdateWorker worker)
        {
            try
            {
                db.SchoolWorkers.Update(worker);
                return HttpResults.successRequest;
            }
            catch (Exception)
            {
                return HttpResults.badRequest;
            }
        }
    }
}
