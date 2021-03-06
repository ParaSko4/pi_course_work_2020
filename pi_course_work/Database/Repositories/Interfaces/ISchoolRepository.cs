﻿using pi_course_work.Database.Models;

namespace pi_course_work.Database.Repositories.Interfaces
{
    public interface ISchoolRepository
    {
        School Get(int id);

        void Add(School school);
        void Update(School school);
        void Delete(int id);

        int GetSchoolId(int fatherId);
        bool isExist(string school);
    }
}
