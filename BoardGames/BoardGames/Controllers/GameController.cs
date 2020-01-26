using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using BoardGames.Models;

namespace BoardGames.Controllers
{
  public class GameController : ApiController
  {
    [HttpGet]
    public List<Game> GetGames()
    {
      Dictionary<string, Game> games = ReadGames();
      return games.Values.OrderBy(g => g.name).ToList();
    }

    [HttpPost]
    public string PostGames(List<Game> newGames)
    {
      try
      {
        Dictionary<string, Game> oldGames = ReadGames();
        foreach (Game game in newGames)
        {
          if (game.name != "(no data)")
          {
            if (oldGames.ContainsKey(game.name))
            {
              oldGames[game.name] = game;
            }
            else
            {
              oldGames.Add(game.name, game);
            }
          }
        }

        string gamesText = string.Join("\n", oldGames.Values.Select((Game g) =>
            g.name + " " + g.time + " " + g.minplayers + " " + g.maxplayers + " " +
            g.rank + " " + g.rating + " " + g.complexity + " " + g.image));
        File.WriteAllText(@"C:\Users\Kyle\Documents\Visual Studio 2015\Projects\BoardGames\BoardGames\Models\games.txt", gamesText);

        return "Success";
      }
      catch (Exception e)
      {
        Console.Out.WriteLine(e);
        return e.ToString();
      }
    }

    [NonAction]
    private Dictionary<string, Game> ReadGames()
    {
      Dictionary<string, Game> games = new Dictionary<string, Game>();

      try
      {
        foreach (string line in File.ReadLines(@"C:\Users\Kyle\Documents\Visual Studio 2015\Projects\BoardGames\BoardGames\Models\games.txt"))
        {
          string[] fields = line.Split(' ');
          int end = fields.Length - 1;
          string name = string.Join(" ", fields.Take(end - 6));

          games.Add(name, new Game
          {
            name = name,
            time = fields[end - 6],
            minplayers = fields[end - 5],
            maxplayers = fields[end - 4],
            rank = fields[end - 3],
            rating = fields[end - 2],
            complexity = fields[end - 1],
            image = fields[end]
          });
        }
        return games;
      }
      catch (Exception e)
      {
        Console.Out.WriteLine(e);
        return games;
      }
    }
  }
}
