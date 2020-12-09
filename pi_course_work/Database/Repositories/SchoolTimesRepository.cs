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
    public class SchoolTimesRepository : ISchoolTimeRepository
    {
        private SchoolCRMContext db;

        public SchoolTimesRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(SchoolTime time)
        {
            db.LoadStoredProc("add_time")
                .AddParam("schoolId", time.idschool)
                .AddParam("period", time.period)
                .AddParam("dayhalf", time.dayhalf)
                .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_time")
                .AddParam("id", id)
                .ExecNonQuery();
        }

        public void DeleteAll(int schoolId)
        {
            db.LoadStoredProc("remove_all_times")
                .AddParam("schoolId", schoolId)
                .ExecNonQuery();
        }

        public List<SchoolTime> GetAll(int schoolId)
        {
            List<SchoolTime> times = null;

            db.LoadStoredProc("get_times")
                .AddParam("schoolId", schoolId)
                .Exec(r => times = r.ToList<SchoolTime>());

            return times;
        }

        public void Update(SchoolTime time)
        {
            db.LoadStoredProc("update_time")
                .AddParam("timeId", time.id)
                .AddParam("period", time.period)
                .AddParam("dayhalf", time.dayhalf)
                .ExecNonQuery();
        }
    }
}
