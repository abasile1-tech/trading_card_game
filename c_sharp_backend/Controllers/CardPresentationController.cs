using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

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

		static void ReadFromDatabase(String columnLabel,String table_id)
		{
			MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;database=trading_cards;username=root;password=");
			conn.Open();
			string query = "SELECT * FROM trading_cards.cards;";
			MySqlCommand cmd = new MySqlCommand(query, conn);
			MySqlDataReader reader = cmd.ExecuteReader();
			Console.WriteLine("Database Connected!");
			while (reader.Read())
			{
				if (reader["id"].ToString() == table_id)
                {
					Console.WriteLine("Reading:" + reader[columnLabel]);
				}
				
			}
			conn.Close();
		}
		
		static void WriteToDatabase()
        {
			MySqlConnection conn2 = new MySqlConnection("server=localhost;port=3306;database=trading_cards;username=root;password=");
			conn2.Open();
			string query2 = "INSERT INTO trading_cards.cards (id,name,color,description) values('4','4name','4color','4description')";
			MySqlCommand cmd2 = new MySqlCommand(query2, conn2);
			cmd2.ExecuteNonQuery();
			conn2.Close();
		}


		[HttpGet(Name = "GetCardPresentation")]
		public IEnumerable<CardPresentation> Get()
		{
			Console.WriteLine("fetching the backend");
			ReadFromDatabase("id","1");
			ReadFromDatabase("name","1");
			ReadFromDatabase("color","1");
			ReadFromDatabase("description","1");
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