namespace EyeAI.API.DTOs
{
    public class PredictionRequest
    {
        public int UserId { get; set; }

        public string FullName { get; set; }

        public int Age { get; set; }

        public string Gender { get; set; }

        public string PreviousDiseases { get; set; }

        public string Medications { get; set; }

        public IFormFile Image { get; set; }
    }
}