using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pi_course_work.Database;
using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersoneDataController : ControllerBase
    {
        private IUnitOfWork unit;

        public PersoneDataController(IUnitOfWork context)
        {
            unit = context;
        }

        // GET: api/<PersoneDataController>
        [HttpGet]
        public IEnumerable<PersonalData> Get()
        {
            return unit.Persones.GetAll();
        }

        // GET api/<PersoneDataController>/5
        [HttpGet("{id}")]
        public PersonalData Get(int id)
        {
            return unit.Persones.Get(id);
        }

        // POST api/<PersoneDataController>
        [HttpPost]
        public void Post([FromBody] PersonalData value, string role)
        {
            unit.Persones.Add(value, role);
            unit.Complete();
        }

        // PUT api/<PersoneDataController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PersoneDataController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            unit.Persones.Delete(id);
            unit.Complete();
        }
    }
}
