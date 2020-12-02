using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories.Interfaces;
using pi_course_work.StaticFields;
using StoredProcedureEFCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace pi_course_work.Database.Repositories
{
    public class SchoolWorkersRepository : ISchoolWorkerRepository
    {
        private SchoolCRMContext db;

        public SchoolWorkersRepository(SchoolCRMContext context)
        {
            this.db = context;
        }

        public void Add(NewWorker worker)
        {
            db.LoadStoredProc("add_school_worker")
               .AddParam("schoolId", worker.schoolId)
               .AddParam("name", worker.name)
               .AddParam("surname", worker.surname)
               .AddParam("middlename", worker.middlename)
               .AddParam("birthday", worker.birthday)
               .AddParam("residence", worker.residence)
               .AddParam("number", worker.number)
               .AddParam("sex", worker.sex)
               .AddParam("role", Roles.TEACHER_ROLE)
               .AddParam("position", worker.position)
               .ExecNonQuery();
        }

        public void Delete(int id)
        {
            db.LoadStoredProc("remove_worker")
                .AddParam("workerId", id)
                .ExecNonQuery();
        }

        public SchoolWorker Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<WorkerData> GetAll(int schoolId)
        {
            List<WorkerData> rows = null;

            db.LoadStoredProc("get_school_workers")
               .AddParam("schoolId", schoolId)
               .Exec(r =>  rows = r.ToList<WorkerData>());

            return rows;
        }

        public void Update(UpdateWorker worker)
        {
            db.LoadStoredProc("update_worker")
                .AddParam("workerId", worker.workerId)
                .AddParam("name", worker.name)
                .AddParam("surname", worker.surname)
                .AddParam("middleName", worker.middlename)
                .AddParam("birthday", worker.birthday)
                .AddParam("residence", worker.residence)
                .AddParam("number", worker.number)
                .AddParam("sex", worker.sex)
                .AddParam("login", worker.login)
                .AddParam("password", worker.password)
                .AddParam("position", worker.position)
                .ExecNonQuery();
        }
    }
}
