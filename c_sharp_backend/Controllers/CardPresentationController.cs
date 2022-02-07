using Microsoft.AspNetCore.Mvc;

namespace c_sharp_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardPresentationController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<CardPresentationController> _logger;

        public CardPresentationController(ILogger<CardPresentationController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetCardPresentation")]
        public IEnumerable<CardPresentation> Get()
        {
            return Enumerable.Range(1, 20).Select(index => new CardPresentation
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}