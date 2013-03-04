using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SocketIOClient;

namespace Socket.io_Winform
{
    class Socket
    {
        public Client client;
        public void StartConnection(string Ip)
        {
            Console.WriteLine("Starting TestSocketIOClient Example...");

            client = new Client(Ip);

            // register for 'connect' event with io server
            client.On("succesfull", (data) =>
            {
                //MessageBox.Show("asd");
            });

            // register for 'update' events - message is a json 'Part' object
            client.On("playerJoined", (data) =>
            {
                //MessageBox.Show(data.RawMessage);
                //SimpleJson.SimpleJson.DeserializeObject<Player>(data.RawMessage);
            });

            // make the socket.io connection

            client.Connect();
        }
    }
}
