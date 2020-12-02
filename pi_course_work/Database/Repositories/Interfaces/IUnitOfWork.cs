namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        ICRMFathersRepository CrmFathers { get; }
        IAuditoriumRepository Auditoriums { get; }
        IClassRepository Classes { get; }
        ILessonRepository Lessons { get; }
        IMembersAccountRepository MembersAccounts { get; }
        IPersonalRepositry Persones { get; }
        IPersonalImgRepository PersonalImg { get; }
        IProgressRepository Progress { get; }
        IScheduleRepository Schedules { get; }
        ISchoolImgRepository SchoolImg { get; }
        ISchoolRepository School { get; }
        ISchoolTimeRepository SchoolTime { get; }
        ISchoolWorkerRepository SchoolWorkers { get; }
        IStudentRepository Students { get; }
        ISchoolDataRepository SchoolData { get; }

        int Complete();
    }
}
