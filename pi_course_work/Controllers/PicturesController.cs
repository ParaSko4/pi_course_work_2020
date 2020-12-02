using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using pi_course_work.Database;
using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private IUnitOfWork unit;

        public PicturesController(IUnitOfWork context)
        {
            unit = context;
        }

        // GET: api/<PicturesController>
        [HttpGet]
        public IEnumerable<PersonalImg> Get()
        {
            return unit.PersonalImg.GetAll();
        }

        // GET api/<PicturesController>/5
        [HttpGet("{id}")]
        public PersonalImg Get(int id)
        {
            return unit.PersonalImg.Get(id);
        }

        // POST api/<PicturesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PicturesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<PicturesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
