using pi_course_work.Database.Contexts;
using pi_course_work.Database.Models;
using pi_course_work.Database.Repositories;
using pi_course_work.Database.Repositories.Interfaces;
using System;

namespace pi_course_work.Database
{
    public class SchoolDbUnit : IUnitOfWork
    {
        private readonly SchoolCRMContext context;

        public SchoolDbUnit(
            SchoolCRMContext context, 
            ICRMFathersRepository crmFathersRepository,
            IAuditoriumRepository auditoriumRepository,
            IClassRepository classRepository,
            ILessonRepository lessonRepository,
            IMembersAccountRepository membersAccountRepository,
            IPersonalRepositry personalRepositry, 
            IPersonalImgRepository personalImgRepositry,
            IProgressRepository progressRepository,
            IScheduleRepository scheduleRepository,
            ISchoolRepository schoolRepository,
            ISchoolImgRepository schoolImgRepository,
            ISchoolTimeRepository schoolTimeRepository,
            ISchoolWorkerRepository schoolWorkerRepository,
            IStudentRepository studentRepository,
            ISchoolDataRepository schoolDataRepository
        )
        {
            this.context = context;

            this.CrmFathers = crmFathersRepository;
            this.Auditoriums = auditoriumRepository;
            this.Classes = classRepository;
            this.Lessons = lessonRepository;
            this.MembersAccounts = membersAccountRepository;
            this.Persones = personalRepositry;
            this.PersonalImg = personalImgRepositry;
            this.Progress = progressRepository;
            this.Schedules = scheduleRepository;
            this.School = schoolRepository;
            this.SchoolImg = schoolImgRepository;
            this.SchoolTime = schoolTimeRepository;
            this.SchoolWorkers = schoolWorkerRepository;
            this.Students = studentRepository;
            this.SchoolData = schoolDataRepository;
        }

        public ICRMFathersRepository CrmFathers { get; }

        public IAuditoriumRepository Auditoriums { get; }

        public IClassRepository Classes { get; }

        public ILessonRepository Lessons { get; }

        public IMembersAccountRepository MembersAccounts { get; }

        public IPersonalRepositry Persones { get; }

        public IPersonalImgRepository PersonalImg { get; }

        public IProgressRepository Progress { get; }

        public IScheduleRepository Schedules { get; }

        public ISchoolRepository School { get; }

        public ISchoolImgRepository SchoolImg { get; }

        public ISchoolTimeRepository SchoolTime { get; }

        public ISchoolWorkerRepository SchoolWorkers { get; }

        public IStudentRepository Students { get; }

        public ISchoolDataRepository SchoolData { get; }


        public int Complete()
        {
            return context.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
