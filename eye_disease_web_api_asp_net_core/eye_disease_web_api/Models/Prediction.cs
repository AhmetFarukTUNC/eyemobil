namespace EyeAI.API.Models
{
    public class Prediction
    {
        public int Id { get; set; }


        public int PatientId { get; set; }


        public Patient Patient { get; set; }


        public string ImagePath { get; set; }


        public string DiseaseResult { get; set; }


        public double Confidence { get; set; }


        public DateTime CreatedDate { get; set; }
    }
}