using System.Net.Http.Headers;
using System.Text.Json;
using EyeAI.API.Models;

namespace EyeAI.API.Services
{
    public class AIService
    {
        private readonly HttpClient _client;

        public AIService()
        {
            _client = new HttpClient();
        }

        public async Task<AIResult?> Predict(IFormFile image)
        {
            using var content = new MultipartFormDataContent();

            using var stream = image.OpenReadStream();

            var fileContent = new StreamContent(stream);

            // React Native'den ContentType boş gelebilir.
            // Bu yüzden doğrudan image.ContentType kullanmıyoruz.
            fileContent.Headers.ContentType =
                new MediaTypeHeaderValue("image/jpeg");

            content.Add(
                fileContent,
                "image",
                string.IsNullOrWhiteSpace(image.FileName)
                    ? "eye-image.jpg"
                    : image.FileName
            );

            var response = await _client.PostAsync(
                "http://127.0.0.1:5000/predict",
                content
            );

            var json =
                await response.Content.ReadAsStringAsync();

            Console.WriteLine("FLASK RESPONSE:");
            Console.WriteLine(json);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(
                    "AI API Error: " + json
                );
            }

            var result =
                JsonSerializer.Deserialize<AIResult>(
                    json,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }
                );

            return result;
        }
    }
}