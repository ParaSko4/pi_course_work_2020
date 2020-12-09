using Microsoft.EntityFrameworkCore;
using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using System;
using System.Collections.Generic;

namespace pi_course_work.Database.Repositories
{
    public class PersonalImgRepository : IPersonalImgRepository
    {
        private SchoolCRMContext db;

        public PersonalImgRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(PersonalImg item)
        {
            //db.personalImg.Add(item);
        }

        public void Delete(int id)
        {
            //db.personalImg.Remove(db.personalImg.Find(id));
        }

        public PersonalImg Get(int id)
        {
            //return db.personalImg.Find(id);
            return null;
        }

        public IEnumerable<PersonalImg> GetAll()
        {
            return null;
        }

        public void Update(PersonalImg item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}