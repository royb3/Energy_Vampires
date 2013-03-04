using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Socket.io_Winform
{
    public partial class Form1 : Form
    {
        Socket socket;
        GroupBox functions;

        public Form1()
        {
            InitializeComponent();
            socket = new Socket();

            functions = GB_Functions;


            functions.Hide();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void BTN_Connect_Click(object sender, EventArgs e)
        {
            try
            {
                socket.client.Close();
            }
            catch
            { }
            socket.StartConnection("http://" + TB_Ip.Text.ToString());
            functions.Show();
        }

        private void BTN_StartGame_Click(object sender, EventArgs e)
        {
            socket.client.Emit("startGame", "startGame");
        }

        private void BTN_StopGame_Click(object sender, EventArgs e)
        {
            socket.client.Emit("stopGame", "stopGame");
        }
    }
}
