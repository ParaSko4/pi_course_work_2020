using pi_course_work.HttpModels;

namespace pi_course_work.StaticFields
{
    public static class HttpResults
    {
        public static readonly RequestResult unauthorizedRequest = new RequestResult("You not are authorized", 7);
        public static readonly RequestResult successRequest = new RequestResult(null, 0);
        public static readonly RequestResult badRequest = new RequestResult("Request have some trouble", 1);
        public static readonly RequestResult badRegisterRequest = new RequestResult("Father or School exist in system", 1);
        public static readonly RequestResult badLoginRequest = new RequestResult("Account does not exist", 1);
    }
}