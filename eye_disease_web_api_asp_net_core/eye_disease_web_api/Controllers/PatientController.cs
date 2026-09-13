using EyeAI.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EyeAI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientController(ApplicationDbContext context)
        {
            _context = context;
        }

        // DELETE: api/Patient/{patientId}/user/{userId}
        [HttpDelete("{patientId}/user/{userId}")]
        public async Task<IActionResult> DeletePatient(
            int patientId,
            int userId)
        {
            var patient = await _context.Patients
                .Include(p => p.Predictions)
                .FirstOrDefaultAsync(
                    p => p.Id == patientId &&
                         p.UserId == userId
                );

            if (patient == null)
            {
                return NotFound(new
                {
                    message = "Patient not found."
                });
            }

            // Prediction kayıtlarını sil
            if (patient.Predictions != null &&
                patient.Predictions.Any())
            {
                _context.Predictions.RemoveRange(
                    patient.Predictions
                );
            }

            // Patient sil
            _context.Patients.Remove(patient);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Patient deleted successfully."
            });
        }

        // GET: api/Patient/user/1
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserPatients(int userId)
        {
            var userExists = await _context.Users
                .AnyAsync(u => u.Id == userId);

            if (!userExists)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            var patients = await _context.Patients
                .Where(p => p.UserId == userId)
                .Include(p => p.Predictions)
                .OrderByDescending(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.UserId,
                    p.FullName,
                    p.Age,
                    p.Gender,
                    p.PreviousDiseases,
                    p.Medications,

                    Predictions = p.Predictions
                        .OrderByDescending(x => x.CreatedDate)
                        .Select(x => new
                        {
                            x.Id,
                            x.DiseaseResult,
                            x.Confidence,
                            x.ImagePath,
                            x.CreatedDate
                        })
                        .ToList()
                })
                .ToListAsync();

            return Ok(patients);
        }
    }
}