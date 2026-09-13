using EyeAI.API.Data;
using EyeAI.API.DTOs;
using EyeAI.API.Models;
using EyeAI.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EyeAI.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PredictionController : ControllerBase
    {


        private readonly ApplicationDbContext _context;

        private readonly IWebHostEnvironment _environment;

        private readonly AIService _ai;





        public PredictionController(
            ApplicationDbContext context,
            IWebHostEnvironment environment,
            AIService ai
        )
        {

            _context = context;

            _environment = environment;

            _ai = ai;

        }







        [HttpPost]
        public async Task<IActionResult> Predict(
            [FromForm] PredictionRequest request
        )
        {


            if (request.Image == null)
            {
                return BadRequest(
                    "Eye image is required"
                );
            }






            // Patient oluştur

            var userExists = await _context.Users
    .AnyAsync(u => u.Id == request.UserId);

            if (!userExists)
            {
                return Unauthorized(new
                {
                    message = "Invalid user."
                });
            }


            var patient = new Patient
            {
                UserId = request.UserId,

                FullName = request.FullName,

                Age = request.Age,

                Gender = request.Gender.ToString(),

                PreviousDiseases = request.PreviousDiseases,

                Medications = request.Medications
            };



            _context.Patients.Add(patient);


            await _context.SaveChangesAsync();









            // Image Upload


            string webRoot =
                _environment.WebRootPath
                ?? Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot"
                );



            string folder =
                Path.Combine(
                    webRoot,
                    "uploads"
                );



            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }






            string fileName =
                Guid.NewGuid().ToString()
                +
                Path.GetExtension(
                    request.Image.FileName
                );



            string filePath =
                Path.Combine(
                    folder,
                    fileName
                );





            using (var stream =
                new FileStream(
                    filePath,
                    FileMode.Create
                ))
            {

                await request.Image.CopyToAsync(stream);

            }









            // Flask AI API

            var aiResult =
                await _ai.Predict(
                    request.Image
                );



            if (aiResult == null)
            {
                return BadRequest(
                    "AI service returned empty result"
                );
            }








            // Prediction kayıt


            var prediction = new Prediction
            {

                PatientId = patient.Id,


                ImagePath =
                    "/uploads/" + fileName,



                DiseaseResult =
                    aiResult.Prediction
                    ?? "Unknown",



                // Database için 0.9621 şeklinde kayıt

                Confidence =
                    aiResult.Confidence,



                CreatedDate =
                    DateTime.Now

            };





            _context.Predictions.Add(prediction);


            await _context.SaveChangesAsync();









            // Response yüzde formatında


            return Ok(new
            {

                message =
                    "AI prediction completed",



                patientId =
                    patient.Id,



                predictionId =
                    prediction.Id,



                disease =
                    prediction.DiseaseResult,



                confidence =
                    $"{prediction.Confidence * 100:F2}%",



                confidenceValue =
                    prediction.Confidence,



                image =
                    prediction.ImagePath

            });


        }




    }

}