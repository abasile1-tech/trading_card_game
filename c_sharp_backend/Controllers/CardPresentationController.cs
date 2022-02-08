using Microsoft.AspNetCore.Mvc;

namespace c_sharp_backend.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class CardPresentationController : ControllerBase
	{
		private static readonly string[] Summaries = new[]
		{
		"Menacing", "Psychotic", "Indignant", "Cool", "Chaotic"
		};

		private static readonly string[] CardNames = new[]
		{
		"Jaro","Benog","Sartik","Nakjo","Runtix"
		};

		private static readonly string[] CardColors = new[]
		{
		"Black","Silver","Blue","White","Yellow"
		};

		private readonly ILogger<CardPresentationController> _logger;

		public CardPresentationController(ILogger<CardPresentationController> logger)
		{
			_logger = logger;
		}

		[HttpGet(Name = "GetCardPresentation")]
		public IEnumerable<CardPresentation> Get()
		{
			return Enumerable.Range(0, CardNames.Length).Select(index => new CardPresentation
			{
				CardName = CardNames[index],
				CardColor = CardColors[index],
				Summary = Summaries[index]
			})
			.ToArray();
		}
	}
}