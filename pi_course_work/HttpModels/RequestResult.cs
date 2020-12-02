namespace pi_course_work.HttpModels
{
    public class RequestResult
    {
        public RequestResult(string error, int result)
        {
            this.error = error;
            this.result = result;
        }

        public string error { get; set; }
        public int result { get; set; }
    }
}
