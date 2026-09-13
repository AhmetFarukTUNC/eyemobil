namespace EyeAI.API.Models
{
    public class Patient
    {
        public int Id { get; set; }

        // Hangi kullanıcıya ait?
        public int UserId { get; set; }

        public User User { get; set; }

        public string FullName { get; set; }

        public int Age { get; set; }

        public string Gender { get; set; }

        public string PreviousDiseases { get; set; }

        public string Medications { get; set; }

        public ICollection<Prediction> Predictions { get; set; }
            = new List<Prediction>();
    }
}