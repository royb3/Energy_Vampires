using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Socket.io_Winform
{
    public class Player
    {
        public int key { get; set; }
        public string nickname { get; set; }
        public int playerId { get; set; }
        public int score { get; set; }
        public string socketId { get; set; }
        public int state { get; set; }
        public string team { get; set; }
    }
}
