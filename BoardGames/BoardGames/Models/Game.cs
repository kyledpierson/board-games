using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BoardGames.Models
{
  public class Game
  {
    public string name { get; set; }
    public string time { get; set; }
    public string minplayers { get; set; }
    public string maxplayers { get; set; }
    public string rank { get; set; }
    public string rating { get; set; }
    public string complexity { get; set; }
    public string image { get; set; }
  }
}
