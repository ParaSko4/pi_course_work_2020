using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class AuditoriumsRepository : IAuditoriumRepository
    {
        private SchoolCRMContext db;

        public AuditoriumsRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(Auditorium auditorium)
        {
            db.LoadStoredProc("add_auditorium")
                .AddParam("schoolId", auditorium.idschool)
                .AddParam("name", auditorium.name)
                .AddParam("number", auditorium.number)
                .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_auditorium")
                .AddParam("id", id)
                .ExecNonQuery();
        }

        public void DeleteAll(int schoolId)
        {
            db.LoadStoredProc("remove_all_auditoriums")
                .AddParam("schoolId", schoolId)
                .ExecNonQuery();
        }

        public List<Auditorium> GetAll(int schoolId)
        {
            List<Auditorium> auditoriums = null;

            db.LoadStoredProc("get_auditoriums")
                .AddParam("schoolId", schoolId)
                .Exec(r => auditoriums = r.ToList<Auditorium>());

            return auditoriums;
        }

        public void Update(Auditorium auditorium)
        {
            db.LoadStoredProc("update_auditorium")
                .AddParam("auditoriumId", auditorium.id)
                .AddParam("name", auditorium.name)
                .AddParam("number", auditorium.number)
                .ExecNonQuery();
        }
    }
}
