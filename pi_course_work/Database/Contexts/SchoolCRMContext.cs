using Microsoft.EntityFrameworkCore;
using pi_course_work.Database.Models;

namespace pi_course_work.Database.Contexts
{
    public class SchoolCRMContext : DbContext
    {
        public DbSet<CRMFather> crmFathers { get; set; }
        public DbSet<PersonalData> personalData { get; set; }
        public DbSet<PersonalImg> personalImg { get; set; }
        public DbSet<Class> classes { get; set; }
        public DbSet<SchoolWorker> schoolWorkers { get; set; }
        public DbSet<SchoolTime> schoolTimes { get; set; }
        public DbSet<SchoolImg> schoolimg { get; set; }
        public DbSet<School> schools { get; set; }
        public DbSet<Student> students { get; set; }
        public DbSet<Progress> progress { get; set; }
        public DbSet<Lesson> lessons { get; set; }
        public DbSet<Auditorium> auditoriums { get; set; }
        public DbSet<Schedule> schedules { get; set; }
        public DbSet<MemberAccount> membersAccounts { get; set; }

        public SchoolCRMContext()
        {
            Database.EnsureCreated();
           
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;UserId=root;Password=1244;database=db_school_crm;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Progress>().HasNoKey();
            modelBuilder.Entity<Schedule>().HasNoKey();
        }
    }
}
